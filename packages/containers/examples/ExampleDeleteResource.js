import React from 'react';
import { DeleteResource } from '../src';

/*
Actions example
The components needs two actions, respectively 'cancel-action' and 'validate-action'.
Also require two fields, uri it contains the uri to call and resourceType, the type of resource.
---------------------------------------
"actions": {
	"my:validate:action": {
		"id": "my:validate:action",
		"label": "Yes",
		"bsStyle": "danger",
		"actionCreator": "deleteResource:validate"
	},
	"my:cancel:action": {
		"id": "my:cancel:action",
		"label": "No",
		"actionCreator": "deleteResource:cancel"
	}
},
"views": {
	"Container(DeleteResource)#resourceType": {
		"resourceInfo": { "uri": "/myEndpoint", "resourceType": "myResourceType" },
		"header": "My header title",
		"cancel-action": "my:cancel:action",
		"validate-action": "my:validate:action"
	}
}
*/

const views = {
	uri: '/myEndpoint',
	resourceType: 'myResourceType',
	resourceTypeLabel: 'resource',
	header: 'My header title',
	'cancel-action': 'dialog:delete:cancel',
	'validate-action': 'dialog:delete:validate',
	routeParams: { id: 'myID' },
	female: true,
};

const params = {
	id: 'myID',
};

const props = {
	...views,
	params,
};

export default {
	default: () => (
		<div>
			<DeleteResource {...props} />;
		</div>
	),
	translated: () => (
		<div>
			<DeleteResource {...props} />
		</div>
	),
};
