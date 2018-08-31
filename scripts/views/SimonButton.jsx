import React, { Component } from 'react';
import classnames from 'classnames';
import signal from 'signal-js';

export default class SimonButton extends Component {
	constructor() {
		super();
		
		this.onDown = this.onDown.bind(this);
		this.onUp = this.onUp.bind(this);
	}
	
	onDown() {
		signal.trigger('colorButtonDown', this.props.index);
	}
	
	onUp() {
		signal.trigger('colorButtonUp', this.props.index);
	}

	render() {
		const {
			index,
			color,
			active,
		} = this.props;
		
		return (
			<div
				onMouseDown={ this.onDown }
				onMouseUp={ this.onUp }
				className={
					classnames(
						'color-button',
						`color-button--${color}`, 
						{
							'color-button--active': active
						}
					)
				}
			/>
		);
	}
};