import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { EditableText } from '../src';

const props = {
	text: 'Example text',
	actionCreatorCancel: 'subheaderbar:cancel',
	actionCreatorSubmit: 'subheaderbar:submit',
	actionCreatorChange: 'subheaderbar:change',
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
