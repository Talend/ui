import { MY_ACTION } from '../constants';

const defaultState = {
	myStateName: 'hello',
	myStateBool: true,
};

export default function myExampleReducer(state = defaultState, action) {
	switch (action.type) {
		case MY_ACTION: {
			return {
				...state,
				myStateBool: false,
			};
		}
		default: {
			return state;
		}
	}
}
