import React from 'react';
import { storiesOf } from '@storybook/react';
import theme from '../src/Loader/Loader.scss';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';
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
    <div className={appLoaderTheme['tc-app-loader']}>
			<div className={appLoaderTheme['tc-app-icon']}></div>
  </div>);
