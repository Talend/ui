import React from 'react';
import { shallow } from 'enzyme';
import RichError from './RichError.component';

describe('RichTooltip', () => {
	it('should render RichTooltip with header, content and footer', () => {
		const wrapper = shallow(<RichError title="Pipelines" error="One error..." />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
