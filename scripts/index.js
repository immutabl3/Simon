import 'babel-polyfill';
import createStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import actions from './actions/index';
import createGame from './game';
import { root } from 'baobab-react/higher-order';

const init = function() {
	const store = createStore();
	const game = createGame(store);
	const mount = document.querySelector('#mount');
	const RootedApp = root(store, Root);
	const render = () => ReactDOM.render(<RootedApp />, mount);
	store.on('update', render);
	actions(store, game);
	render();
};

init();