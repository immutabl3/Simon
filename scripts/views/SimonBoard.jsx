import React from 'react';
import SimonButton from './SimonButton';
import { branch } from 'baobab-react/higher-order';

const SimonBoard = function(props) {
	return (
		<div className="buttons">
			{props.buttons.map((button, index) => {
				return (
					<SimonButton
						{...button}
						key={ index }
						index={ index }
					/>
				);
			})}
		</div>
	);
};

export default branch({
	buttons: ['buttons'],
}, SimonBoard);