import validate from './validate';

const jsonSchema = {
	title: 'my test schema',
	required: ['label'],
	type: 'object',
	properties: {
		label: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
	},
};

const validPayload = {
	label: 'foo',
	description: undefined, // this doesn t work with tv4 and is produced by our lib.
};

const typeNotValidPayload = {
	label: 3,
};

const emptyPayload = {};

describe('Form.validate', () => {
	it('should return true if valid data', () => {
		// eslint-disable-next-line new-cap
		expect(validate(jsonSchema, validPayload)).toBe(true);
	});
	it('should return false if not valid data', () => {
		// eslint-disable-next-line new-cap
		expect(validate(jsonSchema, typeNotValidPayload)).toBe(false);
		// eslint-disable-next-line new-cap
		expect(validate(jsonSchema, emptyPayload)).toBe(false);
	});
});
