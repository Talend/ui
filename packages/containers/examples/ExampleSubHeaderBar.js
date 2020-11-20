import React from 'react';

import { SubHeaderBar } from '../src';

const viewSubHeader = {
	title: 'MyTitle',
	actionCreatorCancel: 'subheaderbar:cancel',
	actionCreatorSubmit: 'subheaderbar:submit',
	actionCreatorChange: 'subheaderbar:change',
	actionCreatorGoBack: 'subheaderbar:goback',
};

const injectedComponentsCenter = {
	center: [
		{
			component: 'FilterBar',
			center: true,
			navbar: true,
			docked: false,
			dockable: false,
		},
	],
};
const injectedComponentsRight = {
	right: [
		{
			actionId: 'subheaderbar:action-sharing',
			component: 'Action',
			right: true,
		},
		{
			actionId: 'subheaderbar:action-bubbles',
			component: 'Action',
			right: true,
		},
	],
};

const props = {
	...viewSubHeader,
};

const ExampleSubHeaderBar = {
	'with-default': () => (
		<div>
			<SubHeaderBar {...props} />
		</div>
	),
	'with-subtitle': () => (
		<div>
			<SubHeaderBar subTitle="mySubTitle" {...props} />
		</div>
	),
	'with-icon': () => (
		<div>
			<SubHeaderBar iconId="talend-file-csv-o" {...props} />
		</div>
	),
	'with-editable': () => (
		<div>
			<SubHeaderBar {...props} editable />
		</div>
	),
	'with-inProgress': () => (
		<div>
			<SubHeaderBar {...props} editable inProgress />
		</div>
	),
	'with-loading': () => (
		<div>
			<SubHeaderBar {...props} loading />
		</div>
	),
	'with-right-actions': () => (
		<div>
			<SubHeaderBar {...props} components={injectedComponentsRight} />
		</div>
	),
	'with-center-actions': () => (
		<div>
			<SubHeaderBar {...props} components={injectedComponentsCenter} />
		</div>
	),
	'with-all': () => (
		<div>
			<SubHeaderBar
				{...props}
				components={Object.assign({}, injectedComponentsCenter, injectedComponentsRight)}
				iconId="talend-file-csv-o"
				subTitle="mySubTitle"
				editable
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
