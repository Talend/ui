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
				.simulate('click');

			// then
			wrapper
				.find('.inside')
				.first()
				.simulate('blur');
			jest.runAllTimers();
			expect(handler).toHaveBeenCalled();
		});

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
				.simulate('click');

			// then
			wrapper
				.find('.inside')
				.first()
				.simulate('blur');
			wrapper
				.find('.inside')
				.first()
				.simulate('focus');
			jest.runAllTimers();
			expect(handler).not.toHaveBeenCalled();
		});
	});
});
