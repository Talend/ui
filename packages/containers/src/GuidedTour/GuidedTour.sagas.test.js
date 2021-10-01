import { show, hide } from './GuidedTour.sagas';
import Connected from './GuidedTour.connect';

describe('Guided Tour sagas', () => {
	it('should show the Guided Tour', () => {
		const gen = show();

		const effect = gen.next().value;
		const expected = Connected.setStateAction({ show: true });
		expect(effect.payload.action).toEqual(expected);

		expect(gen.next().done).toBe(true);
	});

	it('should hide the Guided Tour', () => {
		const gen = hide();

		const effect = gen.next().value;
		const expected = Connected.setStateAction({ show: false });
		expect(effect.payload.action).toEqual(expected);

		expect(gen.next().done).toBe(true);
	});
});
