import { fromJS } from 'immutable';
import selectors from '../../src/selectors';

describe('test selectors.components', () => {
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
	it('selectors.components.toJSMemorized should get immutable collection from state.cmf.components, convert in toJS and memorize', () => {
		const result1 = selectors.components.toJSMemorized(state, 'Container(Form).MY_FORM_ID');
		const result2 = selectors.components.toJSMemorized(state, 'Container(Form).MY_FORM_ID');
		expect(result1).toEqual(formData);
		expect(result1).toBe(result2);
	});

	describe('selectors.components.get should get immutable collection from state.cmf.components', () => {
		const collection = fromJS([]);

		it('selectors.components.get should find the collection if collectionPath is a string', () => {
			expect(selectors.components.get(state, 'Container(List).items')).toEqual(collection);
		});

		it('selectors.components.get should find the collection subset if collectionPath is an array', () => {
			expect(
				selectors.components.get(state, ['Container(Form)', 'MY_FORM_ID']),
			).toEqual(fromJS(formData));
		});

		it('selectors.components.get should throw an exception if collection path is neither a string or an array', () => {
			expect(() => {
				selectors.components.get(state, {});
			}).toThrowError(`Type mismatch: collectionPath should be a string or an array of string
got [object Object]`);
		});
	});

	it('selectors.components.getFormData should get formData collection from state.cmf.components.Container(Form)[path]', () => {
		const result1 = selectors.components.getFormData(state, 'MY_FORM_ID');
		expect(result1).toEqual(fromJS(formData.data));
	});

	it('selectors.components.getFormDataToJS should get formData collection from state.cmf.components.Container(Form)[path] and convert it to POJOs', () => {
		const result1 = selectors.components.getFormDataToJS(state, 'MY_FORM_ID');
		const result2 = selectors.components.getFormDataToJS(state, 'MY_FORM_ID');
		expect(result1).toEqual(formData.data);
		expect(result1).toBe(result2);
	});
});
