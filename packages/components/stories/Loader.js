import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';


const containerStyle = {
	border: '1px solid black',
	width: '100vw',
	height: '100vh',
	display: 'flex',
	'justify-content': 'center',
	'align-items': 'center',
};


const decoratedStories = storiesOf('Loader', module)
	.addDecorator(story => (
		<div style={containerStyle}>
			{story()}
		</div>
	));

decoratedStories
	.addWithInfo('default', () => <Loader />)
	.addWithInfo('small', () => <Loader size={SIZE.small} />)
	.addWithInfo('large', () => <Loader size={SIZE.large} />);
