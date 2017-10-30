import React from 'react';
import { shallow } from 'enzyme';

import CellBadge from './CellBadge.component';

describe('CellActions', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<CellBadge
				cellData={{ label: 'streaming' }}
				rowIndex={25}
				columnData={{
					selected: true,
				}}
			/>,
		);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
