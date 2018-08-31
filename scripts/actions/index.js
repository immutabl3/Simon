import signal from 'signal-js';

export default function actions(store, game) {
	signal.on('colorButtonDown', index => {
		if (game.locked) return;

		store.set(['buttons', index, 'active'], true);
		const buttons = store.get('buttons');
		buttons[index].audio.play();
	});

	signal.on('colorButtonUp', async function(index) {
		store.set(['buttons', index, 'active'], false);
	
		if (game.locked) return;
		game.turn(index);
	});

	signal.on('strictOff', () => {
		if (game.locked || game.isPlaying) return;
		game.strict = false;
	});
	
	signal.on('strictOn', () => {
		if (game.locked || game.isPlaying) return;
		game.strict = true;
	});
	
	signal.on('start', () => {
		if (game.locked) return;
		game.start();
	});

	signal.on('restart', () => {
		if (game.locked) return;
		game.restart();
	});
}