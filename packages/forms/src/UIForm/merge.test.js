import { migrate } from './merge';

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
		expect(migrate(schema.jsonSchema)).toEqual([schema.jsonSchema, expectedUI]);
		expect(migrate(schema.jsonSchema, {})).toEqual([schema.jsonSchema, expectedUI]);
	});
	it('should support simple.json', () => {
		expect(migrate(SIMPLE_STORY.jsonSchema, SIMPLE_STORY.uiSchema)).toEqual([
			SIMPLE_STORY.jsonSchema,
			SIMPLE_STORY_EXPECTED,
		]);
	});
	it('should support ordering.json', () => {
		//console.log(JSON.stringify(migrate(ORDERING_STORY.jsonSchema, ORDERING_STORY.uiSchema)[1], null, 2));
		expect(migrate(ORDERING_STORY.jsonSchema, ORDERING_STORY.uiSchema)).toEqual([
			ORDERING_STORY.jsonSchema,
			ORDERING_STORY_EXPECTED,
		]);
	});
});
