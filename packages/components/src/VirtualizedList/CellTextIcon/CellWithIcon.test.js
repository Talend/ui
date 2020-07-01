import React from 'react';
import { shallow } from 'enzyme';

import CellWithIcon from './CellWithIcon.component';

describe('CellWithIcon', () => {
	it('should render with icon', () => {
		// when
		const columnData = {
			getIcon: () => ({
				label: 'test',
				icon: 'talend-star',
				onClick: jest.fn(),
			}),
		};

		const wrapper = shallow(<CellWithIcon cellData="Test label" columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render without icon', () => {
		// when
		const columnData = {
			getIcon: () => undefined,
		};

		const wrapper = shallow(<CellWithIcon cellData="Test label 2" columnData={columnData} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
