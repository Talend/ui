import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { JSONSchemaRenderer } from '../src/index';

const schema = {
	jsonSchema: {
		title: 'A registration form',
		type: 'object',
		required: [
			'firstName',
			'lastName',
		],
		properties: {
			password: {
				type: 'string',
				title: 'Password',
			},
			lastName: {
				type: 'string',
				title: 'Last name',
			},
			bio: {
				type: 'string',
				title: 'Bio',
			},
			firstName: {
				type: 'string',
				title: 'First name',
			},
			age: {
				type: 'integer',
				title: 'Age',
			},
			tags: {
				type: 'array',
				items: {
					enum: ['a', 'b', 'c', 'd', 'e', 'f'],
					enumNames: ['A', 'B', 'D', 'E', 'F'],
				},
			},
			nested: {
				type: 'object',
				title: 'Nested Elements',
				properties: {
					nestedElement: {
						type: 'string',
					},
					nestedInteger: {
						type: 'integer',
					},
					extraLevel: {
						type: 'object',
						title: 'Extra Level',
						properties: {
							extraLevelStr: {
								type: 'string',
							},
						},
					},
				},
			},
		},
	},
	uiSchema: {
		'ui:order': [
			'firstName',
			'lastName',
			'age',
			'bio',
			'password',
		],
		age: {
			'ui:widget': 'updown',
		},
		bio: {
			'ui:widget': 'textarea',
		},
		password: {
			'ui:widget': 'password',
		},
	},
	properties: {
		age: 75,
		bio: 'Roundhouse kicking asses since 1940',
		password: 'noneed',
		firstName: 'Chuck',
		lastName: 'Norris',
		tags: ['b', 'd', 'f'],
		nested: {
			nestedElement: 'nestedElement',
			nestedInteger: 42,
			extraLevel: {
				extraLevelStr: 'ExtraLevel',
			},
		},
	},
};

storiesOf('JSONSchemaRenderer')
	.addWithInfo('default', () => (
		<div>
			<h1>Basic</h1>
			<JSONSchemaRenderer schema={schema} />
		</div>
	));
