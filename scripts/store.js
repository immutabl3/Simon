import Baobob from 'baobab';

export default function createStore() {
	return new Baobob({
		count: 0,
		playing: false,
		status: '',
		compPicks: [],
		playerPicks: [],
		locked: false,
		strict: false,
		buttons: [
			{
				color: 'green',
				active: false,
				audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
			},
			{
				color: 'red',
				active: false,
				audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
			},
			{
				color: 'blue',
				active: false,
				audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
			},
			{
				color: 'yellow',
				active: false,
				audio: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
			}
		]
	});
}



