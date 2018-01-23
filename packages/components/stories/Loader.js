import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';


const containerStyle = {
	border: '1px solid black',
	width: '500px',
	height: '500px',
	display: 'flex',
	'justify-content': 'center',
	'align-items': 'center',
};

storiesOf('Loader', module)
	.addWithInfo('default', () => (
		<div style={containerStyle}>
			<Loader />
		</div>
	))
	.addWithInfo('small', () => (
		<div style={containerStyle}>
			<Loader size={SIZE.small} />
		</div>
	))
	.addWithInfo('large', () => (
		<div style={containerStyle}>
			<Loader size={SIZE.large} />
		</div>
	));
