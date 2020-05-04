import React from 'react';
import { shallow } from 'enzyme';

import CellIconText from './CellIconText.component';

describe('CellBoolean', () => {
	it('should render an empty cell', () => {
		const wrapper = shallow(<CellIconText />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an icon cell in a truthy case', () => {
		const wrapper = shallow(
			<CellIconText
				cellData={{
					icon: 'talend-list',
					label: 'list',
				}}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
