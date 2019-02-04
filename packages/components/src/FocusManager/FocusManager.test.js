import FocusManager from './FocusManager.component';

describe('FocusManager', () => {
	it('should call onFocusOut if there is no onJSOFocus called', done => {
		// given
		const onFocusOut = jest.fn();
		const focusManager = new FocusManager({ onFocusOut });
		// when
		focusManager.onJSOBlur();
		// then
		setTimeout(() => {
			expect(onFocusOut).toHaveBeenCalled();
			done();
		}, 10);
	});

	it('should not call onFocusOut if there is onJSOFocus is called', done => {
		// given
		const onFocusOut = jest.fn();
		const focusManager = new FocusManager({ onFocusOut });
		// when
		focusManager.onJSOBlur();
		focusManager.onJSOFocus();
		// then
		setTimeout(() => {
			expect(onFocusOut).not.toHaveBeenCalled();
			done();
		}, 10);
	});
});
