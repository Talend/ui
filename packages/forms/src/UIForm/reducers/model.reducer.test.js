import modelReducer from './model.reducer';
import { TF_MUTATE_VALUE } from '../actions';

const oldState = {
	props: 'oldProps',
	user: { firstname: 'oldName' },
};

describe('Model reducers', () => {
	describe('#TF_MUTATE_VALUE', () => {
		it('should mutate simple value', () => {
			// given
			const action = {
				type: TF_MUTATE_VALUE,
				schema: {
					key: ['props'],
				},
				value: 'newProps',
			};

			// when
			const state = modelReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});

		it('should mutate nested value', () => {
			// given
			const action = {
				type: TF_MUTATE_VALUE,
				schema: {
					key: ['user', 'firstname'],
				},
				value: 'newName',
			};

			// when
			const state = modelReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});
});
