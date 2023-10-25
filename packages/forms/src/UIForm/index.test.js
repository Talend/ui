import { UIForm, triggers } from './index';
import ExpectedUIForm from './UIForm.container';
import * as expectedTriggers from './utils/triggers';

jest.unmock('@talend/design-system');

describe('index.js exposed modules', () => {
	it('should expose expected modules', () => {
		expect(UIForm).not.toBeUndefined();
		expect(UIForm).toBe(ExpectedUIForm);
		expect(triggers).not.toBeUndefined();
		expect(triggers).toBe(expectedTriggers);
	});
});
