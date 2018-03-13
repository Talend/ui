import React from 'react';
import { storiesOf } from '@storybook/react';
import theme from '../src/Loader/Loader.scss';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';
import { TALEND_T7_THEME_APPS as apps } from '../src/Layout/constants';
import classNames from 'classnames';
import appLoaderTheme from '@talend/bootstrap-theme/src/theme/_loader.scss';

const containerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const decoratedStories = storiesOf('Loader', module)
	.addDecorator(story => (
		<div style={containerStyle} className={classNames(theme['tc-loader-container'])} >
			{story()}
		</div>
	));

decoratedStories
	.addWithInfo('default', () => <Loader />)
	.addWithInfo('small', () => <Loader size={SIZE.small} />)
	.addWithInfo('large', () => <Loader size={SIZE.large} />)
	.addWithInfo('app loader', () =>
		<div data-app-icon='tdp' className={appLoaderTheme['tc-app-icon']}>
			<div className={appLoaderTheme['tc-app-loader']}><div></div></div>
  </div>);

	apps.forEach(app => {
		decoratedStories.addWithInfo(`[${app.toUpperCase()}] app loader`, () => (
			<div data-app-icon={app} className={appLoaderTheme['tc-app-icon']}>
				<div className={appLoaderTheme['tc-app-loader']}><div></div></div>
			</div>
		));
	});
