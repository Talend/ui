import React from 'react';
import { shallow } from 'enzyme';
import RichError from './RichError.component';

describe('RichLayout', () => {
	it('should render RichLayout with header, content and footer', () => {
		const wrapper = shallow(<RichError title="Pipelines" error="One error..." />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
