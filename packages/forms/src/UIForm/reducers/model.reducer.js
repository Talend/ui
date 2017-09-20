import { TF_UPDATE_FORM_DATA } from '../actions';
import { mutateValue } from '../utils/properties';

/**
 * Form model change reducer
 * @param state The model
 * @param action The action to perform
 */
export default function modelReducer(state = {}, action) {
	switch (action.type) {
	case TF_UPDATE_FORM_DATA:
		return mutateValue(state, action.schema.key, action.value);
	default:
		return state;
	}
}
