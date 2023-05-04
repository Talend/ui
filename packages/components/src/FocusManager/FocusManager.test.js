import { screen, render } from '@testing-library/react';
import FocusManager from './FocusManager.component';

describe('FocusManager', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.useRealTimers();
	});
	it('should call onFocusOut when we click outside', () => {
		// given
		const handler = jest.fn();
		render(
			<FocusManager onFocusOut={handler}>
				<input type="text" className="inside" />
			</FocusManager>,
		);
		// when
		screen.getByRole('textbox').focus();
		screen.getByRole('textbox').blur();

		jest.runAllTimers();

		// then
		expect(handler).toHaveBeenCalled();
	});

	it('should not call onFocusOut when we click inside', () => {
		// given
		const handler = jest.fn();
		render(
			<FocusManager onFocusOut={handler}>
				<input type="text" className="inside" />
			</FocusManager>,
		);
		// when
		screen.getByRole('textbox').blur();
		screen.getByRole('textbox').focus();
		jest.runAllTimers();

		// then
		expect(handler).not.toHaveBeenCalled();
	});

	it('should not call onFocusIn when we click inside', () => {
		// given
		const handler = jest.fn();
		render(
			<FocusManager onFocusIn={handler}>
				<input type="text" className="inside" />
			</FocusManager>,
		);

		// when
		screen.getByRole('textbox').focus();

		// then
		expect(handler).toHaveBeenCalled();
	});
});
