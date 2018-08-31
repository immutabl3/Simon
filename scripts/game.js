import wait from './utilities/wait';
import _ from 'lodash';

export default function createGame(store) {
	const lock = () => store.set('locked', true);
	const unlock = () => store.set('locked', false);

	const showSequence = async function(counter) {
		const compPicksArray = store.get('compPicks');
		const isDone = counter >= store.get('compPicks').length;
		if (isDone) return;

		store.set(['buttons', compPicksArray[counter], 'active'], true);
		const buttons = store.get('buttons');
		buttons[compPicksArray[counter]].audio.play();
		await wait(500);
		store.set(['buttons', compPicksArray[counter], 'active'], false);
		await wait(500);
		return await showSequence(counter + 1);
	};

	const computerMove = function() {
		const randomPick = Math.floor(Math.random() * 4);
		store.push('compPicks', randomPick);
		const count = store.get('count');
		store.set('count', count + 1);
		console.log(store.get('compPicks'));
	};

	const win = function() {
		unlock();
		store.set('status', 'won');
		store.set('playing', false);
	};

	const lose = function() {
		unlock();
		store.set('status', 'lost');
		store.set('playing', false);
	};

	const checkMove = function() {
		const compPicks = store.get('compPicks').slice(0, store.get('playerPicks').length);
		const playerPicks = store.get('playerPicks');
		const compare = _.difference(compPicks, playerPicks);
		return compare.length > 0 ? false : true;
	};

	const next = async function() {
		store.set('playerPicks', []);
		computerMove();
		await wait(500);
		await showSequence(0);
		unlock();
	};

	return {
		get locked() {
			return store.get('locked');
		},
		get playing() {
			return store.get('playing');
		},
		set strict(value) {
			store.set('strict', value);
		},
		async turn(index) {
			debugger;
			lock();
			store.push('playerPicks', index);

			const isCorrect = checkMove();
			if (!isCorrect) {
				const isStrict = store.get('strict');
				if (isStrict) return lose();

				// show them the moves so that
				// they can try to win the game
				await wait(1000);
				await showSequence(0);
				unlock();
				return;
			}
			
			const compPicksLength = store.get('compPicks').length;
			const playerPicksLength = store.get('playerPicks').length;
			const shouldContinuePlaying = playerPicksLength === compPicksLength && store.get('count') < 19;
			if (shouldContinuePlaying) return next();
			
			const didPlayerWin = playerPicksLength === compPicksLength && store.get('count') === 20;
			if (didPlayerWin) return win();
			
			// continue
			unlock();
		},
		async start() {
			this.restart();

			lock();
			store.set('playing', true);		
			computerMove();
			await showSequence(0);
			unlock();
		},
		restart() {
			store.merge({
				count: 0,
				status: '',
				playing: false,
				locked: false,
				compPicks: [],
				playerPicks: [],
			});
		},
	};
};