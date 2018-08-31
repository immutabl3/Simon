import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

const Display = function({
	status,
	playing,
	locked,
	count,
}) {
	const message = status === 'won' ? 'Congradulations!' :
		status === 'lost' ? 'You lose!' :
			playing && locked ? 'Watch' :
				playing && !locked ? `Count: ${count}` :
					'';	
	return (
		<div className="display">
			<p>
				{ message }
			</p>
		</div>
	);
};

export default branch({
	status: ['status'],
	playing: ['playing'],
	locked: ['locked'],
	count: ['count'],
}, Display);