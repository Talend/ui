import React from 'react';
import { shallow } from 'enzyme';
import Comparator from './Comparator.component';

describe('Comparator field', () => {
	const props = {
		id: 'my-comparator-field',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		schema: {
			autoFocus: false,
			description: 'This is the comparator field',
			disabled: false,
			key: ['infos', 'variable'],
			title: 'Variable',
		},
		value: { key: 'lol', value: 'mdr' },
	};


	const props = {
		"id": "default",
		"schema": {
		"key": [
		  "default"
		],
		"widget": "comparator",
		"title": "Default comparator",
		"schema": {
		  "type": "object",
		  "required": [
		    "value"
		  ],
		  "properties": {
		    "operator": {
		      "type": "string",
		      "enum": [
		        ">",
		        "<",
		        "="
		      ]
		    },
		    "value": {
		      "type": "string"
		    }
		  }
		},
		"ngModelOptions": {},
		"type": "fieldset",
		"items": [
		  {
		    "title": "operator",
		    "schema": {
		      "type": "string",
		      "enum": [
		        ">",
		        "<",
		        "="
		      ]
		    },
		    "ngModelOptions": {},
		    "key": [
		      "default",
		      "operator"
		    ],
		    "type": "select",
		    "titleMap": [
		      {
		        "name": ">",
		        "value": ">"
		      },
		      {
		        "name": "<",
		        "value": "<"
		      },
		      {
		        "name": "=",
		        "value": "="
		      }
		    ]
		  },
		  {
		    "title": "value",
		    "required": true,
		    "schema": {
		      "type": "string"
		    },
		    "ngModelOptions": {},
		    "key": [
		      "default",
		      "value"
		    ],
		    "type": "text"
		  }
		]
		},
		"properties": {
		"disabled": {
		  "value": "hihihi"
		}
		},
		"errors": {},
		"widgets": {},
		"isValid": true,
		"valueIsUpdating": false
	};

	it('should render default Comparator', () => {
		// when
		const wrapper = shallow(<Comparator {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled Comparator', () => {
		// given
		const disabledProps = {
			...props,
			schema: {
				...props.schema,
				disabled: true,
			},
		};

		// when
		const wrapper = shallow(<Comparator {...disabledProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
