import React from 'react';
import { mount } from 'enzyme';
import FocusManager from './FocusManager.component';

jest.useFakeTimers();

describe('FocusManager', () => {
	describe('Mounted tests', () => {
		it('should call the callback when we click outside', () => {
			// given
			const handler = jest.fn();
			const wrapper = mount(
				<FocusManager onFocusOut={handler}>
					<input type="text" className="inside" />
				</FocusManager>,
			);
			// when
			wrapper
				.find('.inside')
				.first()
				.simulate('focus');
			wrapper
				.find('.inside')
				.first()
				.simulate('blur');
			jest.runAllTimers();

			// then
			expect(handler).toHaveBeenCalled();
		});

		it('should not call the callback when we click inside', () => {
			// given
			const handler = jest.fn();
			const wrapper = mount(
				<FocusManager onFocusOut={handler}>
					<input type="text" className="inside" />
				</FocusManager>,
			);
			// when
			wrapper
				.find('.inside')
				.first()
				.simulate('blur');
			wrapper
				.find('.inside')
				.first()
				.simulate('focus');
			jest.runAllTimers();

			// then
			expect(handler).not.toHaveBeenCalled();
		});
	});
});
