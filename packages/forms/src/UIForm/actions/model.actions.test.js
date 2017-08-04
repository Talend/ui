import { updateFormData } from './model.actions';

const formName = 'formName';
const jsonSchema = { jsonSchema: 'json' };
const value = { props: 'json' };
const error = 'error';

describe('Model actions', () => {
	describe('#updateFormData action', () => {
		it('should create the action payload', () => {
			// when
			const resultAction = updateFormData(formName, jsonSchema, value, error);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});
});
