import React from 'react';
import { storiesOf } from '@storybook/react';

import AppLoader from './AppLoader.component';
import APP_LOADER from './constant';

const stories = storiesOf('Design Principles/Loading Feedback/AppLoader', module);

stories.add('default', () => (
	<div>
		<style>
			{APP_LOADER.getLoaderStyle(
				`url(${require('@talend/icons/src/svg/products/logo-square.svg')})`,
			)}
		</style>
		<AppLoader />
	</div>
));

[
	'api-designer',
	'api-tester',
	'component-kit',
	'mdm',
	'tdc',
	'tdi',
	'tdp',
	'tds',
	'tmc',
	'tpd',
].forEach(app =>
	stories.add(app, () => (
		<div>
			<style>
				{APP_LOADER.getLoaderStyle(
					`url(${require(`@talend/icons/src/svg/products/${app}-positive.svg`)})`,
				)}
			</style>
			<AppLoader />
		</div>
	)),
);
