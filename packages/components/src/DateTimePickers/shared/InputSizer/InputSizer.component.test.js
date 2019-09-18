import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import InputSizer from './InputSizer.component';

describe('InputSizer', () => {
	it('should call children with width', () => {
		// given
		const children = jest.fn();
		const placeholder = 'YYYY-MM-DD';
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });

		// when
		act(() => {
			mount(<InputSizer placeholder={placeholder}>{children}</InputSizer>);
		});

		// then
		expect(children).toHaveBeenCalledWith(42);
	});
	it('should apply placeholder style when no input', () => {
		const children = jest.fn();
		const wrapper = shallow(<InputSizer placeholder="HH:mm">{children}</InputSizer>);
		const style = wrapper.find('span').prop('style');
		expect(style).toEqual({
			fontSize: '16px',
			fontStyle: 'oblique',
			fontWeight: 400,
			visibility: 'hidden',
		});
	});
	it('should apply inputText style when there is input', () => {
		const children = jest.fn();
		const wrapper = shallow(
			<InputSizer placeholder="HH:mm" inputText="2019-08-21">
				{children}
			</InputSizer>,
		);
		const style = wrapper.find('span').prop('style');
		expect(style).toEqual({ fontSize: '16px', fontWeight: 400, visibility: 'hidden' });
	});
});
