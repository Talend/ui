import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { EditableText } from '../src';

const props = {
	text: 'Example text',
	actionCreatorCancel: 'editabletext:cancel',
	actionCreatorSubmit: 'editabletext:submit',
	actionCreatorChange: 'editabletext:change',
	actionCreatorEdit: 'editabletext:edit',
};

const ExampleEditableText = {
	'with-default': () => (
		<div>
			<IconsProvider />
			<EditableText {...props} />
		</div>
	),
};
export default ExampleEditableText;
