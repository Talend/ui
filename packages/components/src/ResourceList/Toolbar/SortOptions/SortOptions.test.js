import React from 'react';
import { Button } from '@talend/react-bootstrap';
import { mount } from 'enzyme';
import SortOptions, { TYPES, ORDERS } from './SortOptions.component';

describe('SortOptions', () => {
	it('should trigger onChange callback with the new state on click', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<SortOptions
				onChange={onChange}
				nameAsc={false}
				dateAsc
				icon="talend-sort-desc"
				types={[TYPES.NAME, TYPES.DATE]}
				orders={{
					[TYPES.NAME]: ORDERS.ASC,
					[TYPES.DATE]: ORDERS.DESC,
				}}
			/>,
		);

		expect(onChange).not.toBeCalled();

		wrapper.find(Button).at(0).simulate('click');
		expect(onChange).toBeCalledWith(TYPES.NAME, ORDERS.DESC);

		wrapper.find(Button).at(1).simulate('click');
		expect(onChange).toBeCalledWith(TYPES.DATE, ORDERS.ASC);
	});
});
