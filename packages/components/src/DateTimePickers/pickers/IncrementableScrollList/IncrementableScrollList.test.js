import React from 'react';
import { shallow } from 'enzyme';

import IncrementableScrollList from './IncrementableScrollList.component';

describe('IncrementableScrollList', () => {
	it('should render', () => {
		const wrapper = shallow(
			<IncrementableScrollList
				onSelect={() => {}}
				items={[]}
			/>
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
