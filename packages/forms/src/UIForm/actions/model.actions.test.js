import {
	mutateValue,
} from './model.actions';

const formName = 'formName';
const jsonSchema = { jsonSchema: 'json' };
const value = { props: 'json' };
const error = 'error';

describe('Model actions', () => {
	describe('#mutateValue action', () => {
		it('should create the action payload', () => {
			// when
			const resultAction = mutateValue(formName, jsonSchema, value, error);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});
});
