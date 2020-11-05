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
	{ key: 'tdc', value: 'Data Catalog' },
	{ key: 'tdi', value: 'Data Inventory' },
	{ key: 'tdp', value: 'Data Preparation' },
	{ key: 'tds', value: 'Data Stewardship' },
	{ key: 'tmc', value: 'Management Console' },
	{ key: 'tpd', value: 'Pipeline Designer' },
].forEach(app =>
	stories.add(`[${app}] AppLoader`, () => (
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
