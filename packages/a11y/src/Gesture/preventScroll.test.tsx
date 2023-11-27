import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { preventScroll } from './preventScroll';

describe('preventScroll', () => {
	it('Prevent arrow keys', async () => {
		const user = userEvent.setup();

		let event: React.KeyboardEvent<HTMLButtonElement>;

		render(
			<button
				data-testid="my-test-button"
				onKeyDown={e => {
					preventScroll(e);
					event = e;
				}}
			/>,
		);

		screen.getByTestId('my-test-button').focus();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[ArrowLeft]');
		expect(event!.defaultPrevented).toBeTruthy();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[ArrowUp]');
		expect(event!.defaultPrevented).toBeTruthy();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[ArrowRight]');
		expect(event!.defaultPrevented).toBeTruthy();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[ArrowDown]');
		expect(event!.defaultPrevented).toBeTruthy();
	});

	it('Prevent home key', async () => {
		const user = userEvent.setup();

		let event: React.KeyboardEvent<HTMLButtonElement>;

		render(
			<button
				data-testid="my-test-button"
				onKeyDown={e => {
					preventScroll(e);
					event = e;
				}}
			/>,
		);

		screen.getByTestId('my-test-button').focus();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[Home]');
		expect(event!.defaultPrevented).toBeTruthy();
	});

	it('Prevent Page keys', async () => {
		const user = userEvent.setup();

		let event: React.KeyboardEvent<HTMLButtonElement>;

		render(
			<button
				data-testid="my-test-button"
				onKeyDown={e => {
					preventScroll(e);
					event = e;
				}}
			/>,
		);

		screen.getByTestId('my-test-button').focus();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[PageUp]');
		expect(event!.defaultPrevented).toBeTruthy();

		await user.keyboard('[Backspace]');
		expect(event!.defaultPrevented).toBeFalsy();

		await user.keyboard('[PageDown]');
		expect(event!.defaultPrevented).toBeTruthy();
	});
});
