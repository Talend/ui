import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from './Loader.component';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
	width: '100vw',
};

const decoratedStories = storiesOf(
	'Design Principles/Loading Feedback/Loader',
	module,
).addDecorator(story => <div style={containerStyle}>{story()}</div>);

decoratedStories
	.add('small', () => <Loader size={SIZE.small} />)
	.add('default', () => <Loader />)
	.add('large', () => <Loader size={SIZE.large} />);
