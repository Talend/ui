/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
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
	{ key: 'api-designer', value: 'API Designer' },
	{ key: 'api-tester', value: 'API tester' },
	{ key: 'component-kit', value: 'Component kit' },
	{ key: 'mdm', value: 'Master Data Management' },
	{ key: 'datacatalog', value: 'Data Catalog' },
	{ key: 'tdc', value: 'Data Inventory' },
	{ key: 'tdp', value: 'Data Preparation' },
	{ key: 'tds', value: 'Data Stewardship' },
	{ key: 'tmc', value: 'Management Console' },
	{ key: 'datastreams', value: 'Pipeline Designer' },
].forEach(({ key, value }) =>
	stories.add(`[${value}] AppLoader`, () => (
		<div>
			<style>
				{APP_LOADER.getLoaderStyle(
					`url(${require(`@talend/icons/src/svg/products/${key}-positive.svg`)})`,
				)}
			</style>
			<AppLoader />
		</div>
	)),
);
