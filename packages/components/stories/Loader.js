import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '../src';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';

const apps = ['portal', 'tdc', 'tdp', 'tds', 'datastreams', 'tic', 'tmc'];

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
      <IconsProvider />
		</div>
	));

decoratedStories
	.addWithInfo('default', () => <Loader />)
	.addWithInfo('small', () => <Loader size={SIZE.small} />)
	.addWithInfo('large', () => <Loader size={SIZE.large} />)
	.addWithInfo('app loader', () => <Loader size={SIZE.larger} appLogo={'talend-tdp-colored'} />);

apps.forEach(app => {
  decoratedStories.addWithInfo(`[${app.toUpperCase()}] app loader`, () => (
    <Loader size={SIZE.larger} appLogo={`talend-${app}-colored`} />
  ));
});
