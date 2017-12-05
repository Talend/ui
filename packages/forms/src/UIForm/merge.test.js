import React from 'react';
import { migrate } from './merge';

/* eslint-disable react/prop-types */

const SIMPLE_STORY = require('../../stories/json/simple.json');
const SIMPLE_STORY_EXPECTED = require('./merge.test/simple.json');
const ORDERING_STORY = require('../../stories/json/ordering.json');
const ORDERING_STORY_EXPECTED = require('./merge.test/ordering.json');

describe('migrate', () => {
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
		expect(props.widgets.customWidget).toEqual(customWidget);
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
