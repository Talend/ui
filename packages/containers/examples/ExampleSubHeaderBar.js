import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SubHeaderBar } from '../src';

/*
const settings = {
	title,
	subTitle,
	editMode,
	actionCreatorEdit,
	actionCreatorCancel,
	actionCreatorValidate,
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
};
export default ExampleSubHeaderBar;
