import React from 'react';
import { shallow } from 'enzyme';
import NameFilter from './NameFilter.component';

describe('NameFilter', () => {
	it('should trigger onChange callback on change', () => {
		const onChange = jest.fn();
		const payload = {
			target: {
				value: 'titi',
			},
		};

		const wrapper = shallow(<NameFilter onChange={onChange} />);
		expect(onChange).not.toBeCalled();

		wrapper
			.find('DebounceInput')
			.at(0)
			.simulate('change', payload);

		expect(onChange).toBeCalledWith(payload);
	});
});
