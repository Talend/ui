import React from 'react';
import { shallow, mount } from 'enzyme';

import { TimePicker } from './TimePicker.component';

describe('TimePicker component', () => {
	it('should render', () => {
		const wrapper = shallow(<TimePicker onSubmit={jest.fn()} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
	describe('event handlers', () => {
		it('should call onChange when select time', () => {
			// given
			const onChange = jest.fn();
			const event = expect.anything();
			const wrapper = mount(<TimePicker onChange={onChange} />);
			// when
			wrapper.find('button').at(3).simulate('click');
			// then
			expect(onChange).toBeCalledWith(event, { textInput: '03:00', time: { hours: '03', minutes: '00', seconds: '00' } });
		});
		it('should hightlight item matches user input', () => {
			// when
			const scrollIntoViewMock = jest.fn();
			window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
			const wrapper = mount(<TimePicker onSubmit={jest.fn()} textInput="12:00" />);
			wrapper.update();
			// then
			expect(scrollIntoViewMock).toBeCalledWith({ block: 'center' });
			expect(wrapper.find('button').at(12).hasClass('highlight')).toBe(true);
		});
		it('should scroll the first match into view when user inputs', () => {
			// given
			const onSubmit = jest.fn();
			const scrollIntoViewMock = jest.fn();
			window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
			const wrapper = mount(<TimePicker onSubmit={onSubmit} />);

			// when
			wrapper.setProps({ textInput: '20' });
			wrapper.update();

			// then
			expect(scrollIntoViewMock).toBeCalledWith({ block: 'center' });
			expect(wrapper.find('button').at(20).hasClass('highlight')).toBe(true);
		});
	});
});
