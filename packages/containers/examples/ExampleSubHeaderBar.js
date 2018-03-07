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
				components={injectedComponentsRight}
			/>
		</div>
	),
	'with-center-actions': () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} components={injectedComponentsCenter} />
		</div>
	),
	'with-all': () => (
		<div>
			<IconsProvider />
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
