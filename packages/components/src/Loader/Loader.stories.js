import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from '.';

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
	.add('small', () => <Loader size={Loader.SIZE.small} />)
	.add('default', () => <Loader />)
	.add('large', () => <Loader size={Loader.SIZE.large} />);
