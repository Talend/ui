import React from 'react';
import { shallow } from 'enzyme';

import NameFilter from './NameFilter.component';

describe('NameFilter component snaps', () => {
	it('should render NameFilter in default mode', () => {
		const props = {
			onChange: () => {},
			label: 'Example label',
		};

		const wrapper = shallow(<NameFilter {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
