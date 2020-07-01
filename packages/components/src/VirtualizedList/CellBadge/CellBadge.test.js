import React from 'react';
import { shallow } from 'enzyme';

import CellBadge from './CellBadge.component';

describe('CellBadge', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<CellBadge
				cellData="streaming"
				rowIndex={25}
				columnData={{
					selected: true,
				}}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
