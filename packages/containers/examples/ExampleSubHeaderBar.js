import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SubHeaderBar } from '../src';

const viewSubHeader = {
	title: 'MyTitle',
	actionCreatorCancel: 'subheaderbar:cancel',
	actionCreatorEdit: 'subheaderbar:edit',
	actionCreatorSubmit: 'subheaderbar:submit',
	actionCreatorChange: 'subheaderbar:change',
	actionCreatorGoBack: 'subheaderbar:goback',
};

const injectedComponentsCenter = {
	center: [
		{
			componentId: 'FilterBar',
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
			componentId: 'Action',
		},
		{
			actionId: 'subheaderbar:action-bubbles',
			componentId: 'Action',
		},
	],
};

const props = {
	...viewSubHeader,
};

const ExampleSubHeaderBar = {
	'only-title-no-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar subTitle="mySubTitle" {...props} />
		</div>
	),
	'with-right-actions-and-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				subTitle="mySubTitle"
				injectedComponents={injectedComponentsRight}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
	'with-center-actions-and-no-icon-no-subtitle': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} injectedComponents={injectedComponentsCenter} />
		</div>
	),
	'with-center-and-right-actions': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={Object.assign({}, injectedComponentsCenter, injectedComponentsRight)}
				iconFile="talend-file-csv-o"
				subTitle="mySubTitle"
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
