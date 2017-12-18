import React from 'react';
import { IconsProvider } from '@talend/react-components';
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
	'with-default': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} />
		</div>
	),
	'with-subtitle': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				subTitle="mySubTitle"
				{...props}
			/>
		</div>
	),
	'with-icon': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				iconId="talend-file-csv-o"
				{...props}
			/>
		</div>
	),
	'with-editable': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				editable
			/>
		</div>
	),
	'with-right-actions': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={injectedComponentsRight}
			/>
		</div>
	),
	'with-center-actions': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} injectedComponents={injectedComponentsCenter} />
		</div>
	),
	'with-all': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				injectedComponents={Object.assign({}, injectedComponentsCenter, injectedComponentsRight)}
				iconId="talend-file-csv-o"
				subTitle="mySubTitle"
				editable
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
