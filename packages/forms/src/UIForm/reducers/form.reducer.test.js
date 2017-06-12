import formReducer from './form.reducer';
import {
	TF_CREATE_FORM,
	TF_CHANGE_FORM,
	TF_REMOVE_FORM,
	TF_MUTATE_VALUE,
	TF_SET_ALL_ERRORS,
	TF_SET_PARTIAL_ERROR,
} from '../actions';

const formName = 'formName';
const jsonSchema = { jsonSchema: 'json' };
const uiSchema = [{ uiSchema: 'json' }];
const properties = { props: 'json' };
const errors = { field: 'errors' };

const oldState = {
	existingFormName: {
		jsonSchema: { jsonSchema: 'oldJson' },
		uiSchema: [{ uiSchema: 'oldJson' }],
		properties: { props: 'oldJson' },
		errors: { field: 'oldError' },
	},
};

describe('Form reducers', () => {
	describe('#TF_CREATE_FORM', () => {
		it('should not create existing form', () => {
			// given
			const action = {
				type: TF_CREATE_FORM,
				formName: 'existingFormName',
				jsonSchema,
				uiSchema,
				properties,
				errors,
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toBe(oldState);
		});

		it('should not create new form', () => {
			// given
			const action = {
				type: TF_CREATE_FORM,
				formName,
				jsonSchema,
				uiSchema,
				properties,
				errors,
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});

	describe('#TF_CHANGE_FORM', () => {
		it('should not replace anything when form does not exist', () => {
			// given
			const action = {
				type: TF_CHANGE_FORM,
				formName,
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toBe(oldState);
		});

		it('should not replace anything when there is no provided replacement', () => {
			// given
			const action = {
				type: TF_CHANGE_FORM,
				formName: 'existingFormName',
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toBe(oldState);
		});

		it('should replace the forms configurations', () => {
			// given
			const action = {
				type: TF_CHANGE_FORM,
				formName: 'existingFormName',
				jsonSchema,
				uiSchema,
				properties,
				errors,
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});

	describe('#TF_REMOVE_FORM', () => {
		it('should remove form', () => {
			// given
			const action = {
				type: TF_REMOVE_FORM,
				formName: 'existingFormName',
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});

	describe('#TF_MUTATE_VALUE', () => {
		it('should mutate value', () => {
			// given
			const action = {
				type: TF_MUTATE_VALUE,
				formName: 'existingFormName',
				schema: {
					key: ['props'],
				},
				value: 'newJson',
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});

	describe('#TF_SET_ALL_ERRORS', () => {
		it('should replace all errors', () => {
			// given
			const action = {
				type: TF_SET_ALL_ERRORS,
				formName: 'existingFormName',
				errors: {
					field1: 'new error 1',
					field2: 'new error 2',
				},
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});

	describe('#TF_SET_PARTIAL_ERROR', () => {
		it('should set errors', () => {
			// given
			const action = {
				type: TF_SET_PARTIAL_ERROR,
				formName: 'existingFormName',
				errors: {
					field1: 'new error 1',
					field2: 'new error 2',
				},
			};

			// when
			const state = formReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});
});
