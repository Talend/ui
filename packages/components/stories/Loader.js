import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	width: '100vw',
};

const decoratedStories = storiesOf('Loader', module)
	.addDecorator(story => (
		<div style={containerStyle}>
			{story()}
		</div>
	));

decoratedStories
	.addDecorator(checkA11y)
	.addWithInfo('default', () => <Loader />)
	.addWithInfo('small', () => <Loader size={SIZE.small} />)
	.addWithInfo('large', () => <Loader size={SIZE.large} />);
