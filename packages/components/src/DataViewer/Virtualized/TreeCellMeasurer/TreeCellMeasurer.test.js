import React from 'react';
import { shallow } from 'enzyme';
import { CellMeasurerCache } from 'react-virtualized';
import TreeCellMeasurer from './TreeCellMeasurer.component';

describe('TreeCellMeasurer', () => {
	it('it should render my cell renderer', () => {
		const cellRenderer = () => <div>MyCellRenderer</div>;
		const parent = {
			props: {
				cache: new CellMeasurerCache({}),
				paddingOffset: 30,
			},
		};
		const props = {
			parent,
			index: 0,
			style: { padding: 0 },
			cellRenderer,
		};
		const wrapper = shallow(<TreeCellMeasurer {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
