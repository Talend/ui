import { TF_CREATE_FORM, TF_CHANGE_FORM, TF_REMOVE_FORM } from './constants';
import {
	changeForm,
	createForm,
	removeForm,
} from './form.actions';

const formName = 'formName';
const jsonSchema = { jsonSchema: 'json' };
const uiSchema = { uiSchema: 'json' };
const properties = { props: 'json' };
const errors = ['errors'];

describe('Form actions', () => {
	describe('#createForm action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = createForm(formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_CREATE_FORM,
					errors: ['errors'],
					formName: 'formName',
					jsonSchema: { jsonSchema: 'json' },
					properties: { props: 'json' },
					uiSchema: { uiSchema: 'json' },
				}
			);
		});
	});

	describe('#changeForm action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = changeForm(formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_CHANGE_FORM,
					errors: ['errors'],
					formName: 'formName',
					jsonSchema: { jsonSchema: 'json' },
					properties: { props: 'json' },
					uiSchema: { uiSchema: 'json' },
				}
			);
		});
	});

	describe('#removeForm action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = removeForm(formName, jsonSchema, uiSchema, properties, errors);

			// then
			expect(resultAction).toEqual(
				{ formName: 'formName', type: TF_REMOVE_FORM }
			);
		});
	});
});
