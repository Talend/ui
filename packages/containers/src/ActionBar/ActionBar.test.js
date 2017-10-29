import React from 'react';
import { shallow } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';

import Container, { mapStateToProps } from './ActionBar.connect';

describe('Container ActionBar', () => {
	it('should pass the props', () => {
		const props = { actions };
		const wrapper = shallow(
			<Container {...props} />,
			{ context: mock.context() }
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
	it('should compute props using CMF with array of string', () => {
		const wrapper = shallow(
			<Container actionIds={actionIds} />
		, { context: mock.context() });
		expect(wrapper.props()).toMatchSnapshot();
	});
});
