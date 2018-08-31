import React from 'react';
import classnames from 'classnames';
import signal from 'signal-js';
import { branch } from 'baobab-react/higher-order';

const Controls = function(props) {
	const isStrict = props.isStrict;
	return (
		<div className="controls">
			<div 
				onClick={() => {signal.trigger('strictOff');}}
				className={
					classnames(
						'control-button control-button--normal',
						{ 'control-button--selected': !isStrict }
					)
				}
			>
				<p>normal</p>
			</div>
			<div 
				onClick={() => {signal.trigger('strictOn');}}
				className={
					classnames(
						'control-button control-button--strict',
						{ 'control-button--selected': isStrict }
					)
				}>
				<p>strict</p>
			</div>
			<div 
				onClick={() => {signal.trigger('start');}}
				className="control-button control-button--start">
				<p>start</p>
			</div>
			<div 
				onClick={() => {signal.trigger('restart');}}
				className="control-button control-button--restart">
				<p>restart</p>
			</div>
		</div>
	);
};

export default branch({
	isStrict: ['strict'],
}, Controls);