import React from 'react';
import { shallow } from 'enzyme';
import HeaderTitle from './HeaderTitle.component';

describe('HeaderTooltip', () => {
	it('should render HeaderTooltip with header, content and footer', () => {
		const wrapper = shallow(<HeaderTitle title="Pipelines" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
