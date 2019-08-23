import React from 'react';
import { shallow, mount } from 'enzyme';

import { TimePicker, isBefore, addInterval, getOptions } from './TimePicker.component';

describe('TimePicker component', () => {
	it('should render', () => {
		const wrapper = shallow(<TimePicker onSubmit={jest.fn()} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
	describe('functions', () => {
		describe('function - isBefore', () => {
			it('should return true when time1 is seconds before time2', () => {
				const time1 = { hours: 10, minutes: 30, seconds: 0 };
				const time2 = { hours: 10, minutes: 30, seconds: 1 };

				expect(isBefore(time1, time2)).toBe(true);
			});
			it('should return true when time1 is minutes before time2', () => {
				const time1 = { hours: 10, minutes: 20, seconds: 1 };
				const time2 = { hours: 10, minutes: 30, seconds: 1 };

				expect(isBefore(time1, time2)).toBe(true);
			});
			it('should return true when time1 is hours before time2', () => {
				const time1 = { hours: 9, minutes: 30, seconds: 1 };
				const time2 = { hours: 10, minutes: 30, seconds: 1 };

				expect(isBefore(time1, time2)).toBe(true);
			});
			it('should return false when time1 is seconds after time2', () => {
				const time1 = { hours: 10, minutes: 30, seconds: 1 };
				const time2 = { hours: 10, minutes: 30, seconds: 0 };

				expect(isBefore(time1, time2)).toBe(false);
			});
			it('should return false when time1 is minutes after time2', () => {
				const time1 = { hours: 10, minutes: 30, seconds: 1 };
				const time2 = { hours: 10, minutes: 28, seconds: 1 };

				expect(isBefore(time1, time2)).toBe(false);
			});
			it('should return false when time1 is hours after time2', () => {
				const time1 = { hours: 11, minutes: 30, seconds: 1 };
				const time2 = { hours: 10, minutes: 30, seconds: 1 };

				expect(isBefore(time1, time2)).toBe(false);
			});
		});
		describe('function - addInterval', () => {
			it('should add 60 minutes when interval is not specified', () => {
				const base = { hours: 10, minutes: 20 };
				expect(addInterval(base)).toEqual({ hours: 11, minutes: 20 });
			});
			it('should add minutes to time specified by interval', () => {
				const base = { hours: 10, minutes: 20 };
				const interval = 45;
				expect(addInterval(base, interval)).toEqual({ hours: 11, minutes: 5 });
			});
		});
		describe('function - getOptions', () => {
			it('should get options with default value', () => {
				expect(getOptions()).toEqual(
					['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
						'07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
						'14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
						'21:00', '22:00', '23:00']);
			});
			it('should get options base on interval', () => {
				expect(getOptions(360)).toEqual(['00:00', '06:00', '12:00', '18:00']);
			});
			it('should get options with seconds', () => {
				expect(getOptions(240, true)).toEqual(
					['00:00:00', '04:00:00', '08:00:00', '12:00:00', '16:00:00', '20:00:00']
				);
			});
		});
	});
	describe('event handlers', () => {
		it('should call onSubmit when select time', () => {
			// given
			const onSubmit = jest.fn();
			const event = expect.anything();
			const wrapper = mount(<TimePicker onSubmit={onSubmit} />);
			// when
			wrapper.find('button').at(3).simulate('click');
			// then
			expect(onSubmit).toBeCalledWith(event, { time: { hours: '03', minutes: '00', seconds: '00' } });
		});
		it('should hightlight item matches user input', () => {
			// when
			const scrollIntoViewMock = jest.fn();
			window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
			const wrapper = mount(<TimePicker onSubmit={jest.fn()} textInput="12:00" />);
			wrapper.update();
			// then
			expect(scrollIntoViewMock).toBeCalledWith({ block: 'center' });
			expect(wrapper.state().hightlightedItemIndex).toBe(12);
		});
		it('should sroll the first match into view when user inputs', () => {
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
			expect(wrapper.state().hightlightedItemIndex).toBe(20);
		});
	});
});
