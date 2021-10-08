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
	'with-default': () => <SubHeaderBar {...props} />,
	'with-subtitle': () => <SubHeaderBar subTitle="mySubTitle" {...props} />,
	'with-icon': () => <SubHeaderBar iconId="talend-file-csv-o" {...props} />,
	'with-editable': () => <SubHeaderBar {...props} editable />,
	'with-inProgress': () => <SubHeaderBar {...props} editable inProgress />,
	'with-loading': () => <SubHeaderBar {...props} loading />,
	'with-right-actions': () => <SubHeaderBar {...props} components={injectedComponentsRight} />,
	'with-center-actions': () => <SubHeaderBar {...props} components={injectedComponentsCenter} />,
	'with-all': () => (
		<SubHeaderBar
			{...props}
			components={{ ...injectedComponentsCenter, ...injectedComponentsRight }}
			iconId="talend-file-csv-o"
			subTitle="mySubTitle"
			editable
		/>
	),
};
export default ExampleSubHeaderBar;
