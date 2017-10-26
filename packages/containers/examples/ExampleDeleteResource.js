import React from 'react';
import { DeleteResource } from '../src';

/*
Actions example
The components needs two actions, respectively 'cancel-action' and 'validate-action'.
Also require a resourceInfo object, which contains the uri to call and the resourceType.
---------------------------------------
"actions": {
	"myValidateAction": {
		"id": "myValidateAction",
		"label": "Yes",
		"bsStyle": "danger",
		"actionCreator": "deleteResource:validate"
	},
	"myCancelAction": {
		"id": "myCancelAction",
		"label": "No",
		"actionCreator": "deleteResource:cancel"
	}
},
"views": {
	"Container(DeleteResource)#resourceType": {
		"resourceInfo": { "uri": "/myEndpoint", "resourceType": "myResourceType" },
		"header": "My header title",
		"cancel-action": "myCancelAction",
		"validate-action": "myValidateAction"
	}
}
*/

const views = {
	resourceInfo: { uri: '/myEndpoint', resourceType: 'myResourceType' },
	header: 'My header title',
	'cancel-action': 'dialog:delete:cancel',
	'validate-action': 'dialog:delete:validate',
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
