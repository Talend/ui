import UIForm from './UIForm.container';
import { modelReducer, validationReducer } from './reducers';

export const formReducers = {
	model: modelReducer,
	errors: validationReducer,
};
export default UIForm;
