import store from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import signal from 'signal-js';


const init = function() {
	const root = document.querySelector('#root');
	const render = () => ReactDOM.render(<Root {...store.get()}/>, root);
	store.on('update', render);
	render();
};

signal.on('strictOff', () => {
	store.set('strict', false);
	console.log(store.get('strict'));
});

signal.on('strictOn', () => {
	store.set('strict', true);
	console.log(store.get('strict'));
});

signal.on('start', () => {
	console.log("start");
});

init();