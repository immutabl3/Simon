import Baobob from 'baobab';

export default new Baobob({
	count: 0,
	compPicks: [],
	playerPicks: [],
	playerTurn: false,
	strict: false,
	audio: [
		new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
		new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
		new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
		new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	]
});

