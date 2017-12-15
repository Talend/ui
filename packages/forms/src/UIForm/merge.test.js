import React from 'react';
import { mount, shallow } from 'enzyme';
import merge, { migrate, wrapCustomWidget } from './merge';

/* eslint-disable react/prop-types */

const SIMPLE_STORY = require('../../stories/json/simple.json');
const SIMPLE_STORY_EXPECTED = require('./merge.test/simple.json');
const SIMPLE_STORY_MERGED_EXPECTED = require('./merge.test/simple-merged.json');
const ORDERING_STORY = require('../../stories/json/ordering.json');
const ORDERING_STORY_EXPECTED = require('./merge.test/ordering.json');
const WIDGETS_STORY = require('../../stories/json/widgets.json');
const WIDGETS_STORY_EXPECTED = require('./merge.test/widgets.json');

describe('migrate', () => {
	it('should do nothing if the uischema is an array', () => {
		const uiSchema = [];
		expect(migrate({}, uiSchema)).toEqual({ jsonSchema: {}, uiSchema, widgets: {} });
	});
	it('should support no uiSchema', () => {
		const schema = {
			jsonSchema: {
				title: 'foo schema',
				type: 'object',
				properties: {
					foo: {
						title: 'Foo',
						type: 'string',
					},
				},
			},
			properties: { foo: 'bar' },
		};
		const expectedUI = [
			{
				title: 'foo schema',
				widget: 'fieldset',
				items: [{ key: 'foo', widget: 'text', title: 'Foo' }],
			},
		];
		expect(migrate(schema.jsonSchema)).toEqual({
			jsonSchema: schema.jsonSchema,
			uiSchema: expectedUI,
		});
		expect(migrate(schema.jsonSchema, {})).toEqual({
			jsonSchema: schema.jsonSchema,
			uiSchema: expectedUI,
			widgets: {},
		});
	});

	it('should support simple.json', () => {
		expect(migrate(SIMPLE_STORY.jsonSchema, SIMPLE_STORY.uiSchema).uiSchema).toEqual(
			SIMPLE_STORY_EXPECTED,
		);
	});
	it('should support ordering.json', () => {
		expect(migrate(ORDERING_STORY.jsonSchema, ORDERING_STORY.uiSchema).uiSchema).toEqual(
			ORDERING_STORY_EXPECTED,
		);
	});
	it('should support widgets.json', () => {
		expect(migrate(WIDGETS_STORY.jsonSchema, WIDGETS_STORY.uiSchema).uiSchema).toEqual(
			WIDGETS_STORY_EXPECTED,
		);
	});
	it('should support ui:trigger -> set triggers', () => {
		const uiSchema = JSON.parse(JSON.stringify(SIMPLE_STORY.uiSchema));  // deep copy
		uiSchema.password['ui:trigger'] = ['after'];
		const expected = JSON.parse(JSON.stringify(SIMPLE_STORY_EXPECTED));
		expected[0].items[4].triggers = ['after'];
		expect(migrate(SIMPLE_STORY.jsonSchema, uiSchema).uiSchema).toEqual(
			expected,
		);
	});
	it('should support ui:autofocus -> set autoFocus', () => {
		const uiSchema = JSON.parse(JSON.stringify(SIMPLE_STORY.uiSchema));  // deep copy
		uiSchema.age['ui:autofocus'] = true;
		const expected = JSON.parse(JSON.stringify(SIMPLE_STORY_EXPECTED));
		expected[0].items[2].autoFocus = true;
		expect(migrate(SIMPLE_STORY.jsonSchema, uiSchema).uiSchema).toEqual(
			expected,
		);
	});
	//  189
	it('should support custom widget', () => {
		const customWidget = ({ id, value, options }) => {
			const { color, backgroundColor } = options;
			return (
				<div id={id} className="well well-sm" style={{ color, backgroundColor }}>
					{value}
				</div>
			);
		};
		const schema = {
			jsonSchema: {
				title: 'custom',
				type: 'object',
				properties: {
					customWidget: {
						type: 'string',
						title: 'custom widget',
					},
				},
			},
			uiSchema: {
				customWidget: {
					'ui:widget': customWidget,
				},
			},
			properties: {
				customWidget: 'value',
			},
		};
		const props = migrate(schema.jsonSchema, schema.uiSchema);
		expect(props.widgets.customWidget.displayName).toBe('TFMigratedWidget');
		expect(props.uiSchema).toEqual([
			{
				title: 'custom',
				widget: 'fieldset',
				items: [
					{
						key: 'customWidget',
						title: 'custom widget',
						widget: 'customWidget',
					},
				],
			},
		]);
	});
});

describe('wrapCustomWidget', () => {
	it('should create an higher order component', () => {
		const component = jest.fn(() => <div />);
		const Wrapper = wrapCustomWidget(component);
		mount(<Wrapper schema={{}} />);
		expect(component).toHaveBeenCalled();
	});
	it('should wrap onChange', () => {
		const onChange = jest.fn();
		const component = () => <div />;
		const Wrapper = wrapCustomWidget(component);
		const wrapper = shallow(<Wrapper onChange={onChange} schema={{ triggers: ['after'] }} />);
		wrapper.simulate('change', { foo: 'bar' });
		expect(onChange.mock.calls[0]).toEqual([{}, { schema: { triggers: ['after' ]}, value: { foo: 'bar' } }]);
	});
});

describe('default merge', () => {
	it('should return props', () => {
		expect(merge({}, [])).toEqual({
			jsonSchema: {},
			uiSchema: [],
			mergedSchema: [],
		});
	});
	it('should return props', () => {
		expect(merge(SIMPLE_STORY.jsonSchema, SIMPLE_STORY.uiSchema).uiSchema).toEqual(
			SIMPLE_STORY_MERGED_EXPECTED,
		);
	});
});
