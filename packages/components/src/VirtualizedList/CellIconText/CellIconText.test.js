import React from 'react';
import { shallow } from 'enzyme';

import CellIconText from './CellIconText.component';

describe('CellIconText', () => {
	it('should render an empty cell', () => {
		const wrapper = shallow(<CellIconText />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an icon cell with an icon', () => {
		const wrapper = shallow(
			<CellIconText
				cellData={{
					icon: 'talend-list',
					label: 'list',
				}}
				rowData={{ iconType: 'iconType' }}
				columnData={{
					getIcon: ({ type }) => type,
					getIconTooltip: rowData => rowData.icon,
				}}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an icon cell with an icon using the getIcon method', () => {
		const wrapper = shallow(
			<CellIconText
				cellData="List"
				rowData={{ type: 'list' }}
				columnData={{ getIcon: ({ type }) => `hihihi-${type}` }}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
