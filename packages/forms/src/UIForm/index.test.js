import {
	ConnectedUIForm,
	UIForm,
	formReducer,
	triggers,
} from './index';
import ExpectedUIForm from './UIForm.container';
import ExpectedConnectedUIForm from './UIForm.connect';
import { formReducer as expectedReducer } from './reducers';
import * as expectedTriggers from './utils/triggers';

describe('index.js exposed modules', () => {
	it('should expose expected modules', () => {
		expect(ConnectedUIForm).not.toBeUndefined();
		expect(ConnectedUIForm).toBe(ExpectedConnectedUIForm);
		expect(UIForm).not.toBeUndefined();
		expect(UIForm).toBe(ExpectedUIForm);
		expect(formReducer).not.toBeUndefined();
		expect(formReducer).toBe(expectedReducer);
		expect(triggers).not.toBeUndefined();
		expect(triggers).toBe(expectedTriggers);
	});
});
