import React from 'react';
import { DeleteResource } from '../src';

/*
Actions example
The form actions need to be named 'dialog:delete:cancel' and 'dialog:delete:validate'.
Respectively to cancel and validate the action.
---------------------------------------
"actions": {
	"dialog:delete:validate": {
		"id": "dialog:delete:validate",
		"label": "Yes",
		"bsStyle": "danger",
			"actionCreator": "deleteResource:validate"
		},
	"dialog:delete:cancel": {
		"id": "dialog:delete:cancel",
		"label": "No",
		"actionCreator": "deleteResource:cancel"
	}
},
*/

const views = {
	resourceInfo: { uri: '/myEndpoint', resourceType: 'myResourceType' },
	header: 'My header title',
	'form-actions': ['dialog:delete:cancel', 'dialog:delete:validate'],
};

const params = {
	id: 'myID',
};

const props = {
	...views,
	params,
};

export default function ExampleAction() {
	return <DeleteResource {...props} />;
}
