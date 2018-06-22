import { fromJS } from 'immutable';
import selectors from '../../src/selectors';

describe('selectors.components', () => {
	const formData = {
		data: { type: 'engine' },
		dirty: false,
	};
	const state = {
		cmf: {
			components: fromJS({
				'Container(Form)': {
					MY_FORM_ID: formData,
				},
				'Container(List)': {
					items: [],
				},
			}),
		},
	};
	describe('toJS', () => {
		const result1 = selectors.components.toJS(state, 'Container(Form).MY_FORM_ID');
		const result2 = selectors.components.toJS(state, 'Container(Form).MY_FORM_ID');
		expect(result1).toEqual(formData);
		expect(result1).toBe(result2);
	});

	describe('get', () => {
		const collection = fromJS({ items: [] });

		it('try to find the collection if collectionPath is a string', () => {
			expect(selectors.components.get(state, 'Container(List)')).toEqual(collection);
		});

		it('try to find the collection subset if collectionPath is an array', () => {
			expect(
				selectors.components.get(state, ['Container(Form)', 'MY_FORM_ID']),
			).toEqual(fromJS(formData));
		});

		it('throw an exception if collection path is neither a string or an array', () => {
			expect(() => {
				selectors.components.get(state, {});
			}).toThrowError(`Type mismatch: collectionPath should be a string or an array of string
got [object Object]`);
		});
	});

	describe('getFormDataToJS', () => {
		const result1 = selectors.components.getFormDataToJS(state, 'MY_FORM_ID');
		const result2 = selectors.components.getFormDataToJS(state, 'MY_FORM_ID');
		expect(result1).toEqual(formData.data);
		expect(result1).toBe(result2);
	});

	describe('getFormData', () => {
		const result1 = selectors.components.getFormData(state, 'MY_FORM_ID');
		const result2 = selectors.components.getFormData(state, 'MY_FORM_ID');
		expect(result1).toEqual(fromJS(formData.data));
		expect(result1).toBe(result2);
	});
});
