import React from 'react';
import { shallow } from 'enzyme';

import <%= props.name %> from './<%= props.name %>.component';

const columnData = {
	id: 'my-column',
	label: 'My Test Check',
	onChange: jest.fn(),
};

describe('<%= props.name %>', () => {
	it('should render default render', () => {
		// when
		const wrapper = shallow(
			<<%= props.name %>
				cellData
				columnData={columnData}
			/>
		);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
