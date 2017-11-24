import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SubHeaderBar } from '../src';

/*
const view = {
	title,
	subTitle,
	editMode,
	actionCreatorEdit,
	actionCreatorCancel,
	actionCreatorValidate,
	actionsRight: [action1Id, action2Id, action3Id, action4Id],
}

const action1Id = {
	id: action1Id,
	tag: button,
	actionCreator,
	icon,
	hideLabel,
	overlay,
	...stuff
}

const action2Id = {
	id: action2Id,
	tag: form,
	icon,
	hideLabel,
	component,
	...componentProps,
	...stuff
}
*/

const viewSubHeader = {
	title: 'Marketing',
	subTitle: 'Creator John Doe',
	onClickEdit: () => console.log('onClickEdit'),
	onClickValidate: () => console.log('onClickValidate'),
	onClickCancel: () => console.log('onClickCancel'),
};

const backAction = {
	id: 'backAction',
	icon: 'talend-arrow-left',
	onClick: () => console.log('backAction'),
	className: 'tc-subheader-bar-back-icon',
};

const actionsRight = ['subheaderbar:action-sharing', 'subheaderbar:action-sharing'];
const actionsCenter = ['subheaderbar:action-filter'];

const props = {
	...viewSubHeader,
	backAction,
};

const ExampleSubHeaderBar = {
	default: () => (
		<div>
			<IconsProvider />
			<SubHeaderBar {...props} iconFile="talend-file-csv-o" />
		</div>
	),
	withActions: () => (
		<div>
			<IconsProvider />
			<SubHeaderBar
				{...props}
				actionsCenter={actionsCenter}
				actionsRight={actionsRight}
				iconFile="talend-file-csv-o"
			/>
		</div>
	),
};
export default ExampleSubHeaderBar;
