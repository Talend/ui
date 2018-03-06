
import validate from './validate';

const jsonSchema = {
	title: 'my test schema',
	required: ['label'],
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
