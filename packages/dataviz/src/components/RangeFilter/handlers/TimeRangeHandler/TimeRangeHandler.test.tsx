import React from 'react';
import { shallow } from 'enzyme';
import { TimeRangeHandler, TimeInputField } from './TimeRangeHandler';

const H11_11_11_IN_SECS = 11 * 3600 + 11 * 60 + 11;

describe('TimeRangeHandler', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		const component = shallow(<TimeInputField id="" value={9845} onChange={onChange} />);

		// @ts-ignore
		component.find('InputTimePicker').invoke('onChange')!({}, { textInput: '11:11:11' } as any);
		expect(onChange).not.toHaveBeenCalled();

		component.find('InputTimePicker').invoke('onBlur')!({} as any);
		expect(onChange).toHaveBeenCalledWith(H11_11_11_IN_SECS);
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		const component = shallow(
			<TimeInputField id="" value={H11_11_11_IN_SECS} onChange={onChange} />,
		);

		// @ts-ignore
		component.find('InputTimePicker').invoke('onChange')!({}, { textInput: '12:12:12' } as any);
		component.find('InputTimePicker').invoke('onKeyDown')!({ key: 'Escape' } as any);

		expect(component.find('InputTimePicker').prop('value')).toBe('11:11:11');
	});

	it('Should submit value on Enter', () => {
		const onChange = jest.fn();
		const component = shallow(<TimeInputField id="" value={3600} onChange={onChange} />);

		// @ts-ignore
		component.find('InputTimePicker').invoke('onChange')!({}, { textInput: '11:11:11' } as any);
		component.find('InputTimePicker').invoke('onKeyDown')!({ key: 'Enter' } as any);

		expect(onChange).toHaveBeenCalledWith(H11_11_11_IN_SECS);
	});

	it('Should format tick', () => {
		const max = TimeRangeHandler.tickFormatter(H11_11_11_IN_SECS);
		expect(max).toEqual('11:11:11');
	});
});
