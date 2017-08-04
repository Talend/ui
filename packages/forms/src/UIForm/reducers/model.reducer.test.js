import modelReducer from './model.reducer';
import { TF_UPDATE_FORM_DATA } from '../actions';

const oldState = {
	props: 'oldProps',
	user: { firstname: 'oldName' },
	comments: [{ from: 'toto', message: 'lol' }, { from: 'tata', message: 'oldMessage' }],
};

describe('Model reducers', () => {
	describe('#TF_UPDATE_FORM_DATA', () => {
		it('should mutate simple value', () => {
			// given
			const action = {
				type: TF_UPDATE_FORM_DATA,
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
				type: TF_UPDATE_FORM_DATA,
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

		it('should mutate array item', () => {
			// given
			const action = {
				type: TF_UPDATE_FORM_DATA,
				schema: {
					key: ['comments', 1, 'message'],
				},
				value: 'newMessage',
			};

			// when
			const state = modelReducer(oldState, action);

			// then
			expect(state).toMatchSnapshot();
		});
	});
});
