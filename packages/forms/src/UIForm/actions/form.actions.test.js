import {
	createForm,
	removeForm,
	updateForm,
} from './form.actions';

const formName = 'formName';
const jsonSchema = { jsonSchema: 'json' };
const uiSchema = [{ uiSchema: 'json' }];
const properties = { props: 'json' };
const errors = { field: 'errors' };

describe('Form actions', () => {
	describe('#createForm action', () => {
		it('should create the action payload', () => {
			// when
			const resultAction = createForm(formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});

	describe('#updateForm action', () => {
		it('should create the action payload', () => {
			// given

			// when
			const resultAction = updateForm(formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});

	describe('#removeForm action', () => {
		it('should create the action payload', () => {
			// given

			// when
			const resultAction = removeForm(formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(resultAction).toMatchSnapshot();
		});
	});
});
