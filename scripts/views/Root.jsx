import React from 'react';
import SimonBoard from './SimonBoard';
import Controls from './Controls';
import Display from './Display';


export default function Root(store) {
	return (
		<div>
			<SimonBoard />
			<Controls isStrict = {store.strict}/>
			<Display />
		</div>
	);
}
