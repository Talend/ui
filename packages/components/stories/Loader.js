import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '../src';
import theme from '../src/Loader/Loader.scss';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';
import { TALEND_T7_THEME_APPS as apps } from '../src/Layout/constants';
import classNames from 'classnames';

const containerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const decoratedStories = storiesOf('Loader', module)
	.addDecorator(story => (
		<div style={containerStyle} className={classNames(theme['tc-loader-container'])} >
			{story()}
      <IconsProvider />
		</div>
	));

decoratedStories
	.addWithInfo('default', () => <Loader />)
	.addWithInfo('small', () => <Loader size={SIZE.small} />)
	.addWithInfo('large', () => <Loader size={SIZE.large} />)
	.addWithInfo('app loader', () => <Loader size={SIZE.xlarge} iconName={'talend-tdp-colored'} />);

apps.forEach(app => {
  decoratedStories.addWithInfo(`[${app.toUpperCase()}] app loader`, () => (
    <Loader size={SIZE.xlarge} iconName={`talend-${app}-colored`} />
  ));
});
