import EditableText from '.';

const props = {
	text: 'Example text',
	actionCreatorCancel: 'editabletext:cancel',
	actionCreatorSubmit: 'editabletext:submit',
	actionCreatorChange: 'editabletext:change',
	actionCreatorEdit: 'editabletext:edit',
};

export default {
	title: 'EditableText',
};

export function WithDefault() {
	return <EditableText {...props} />;
}
