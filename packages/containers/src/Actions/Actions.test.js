import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';

import Actions from './Actions.connect';

describe('Actions', () => {
	it('should render', () => {
		const context = mock.store.context();
		const wrapper = shallow(<Actions actionIds={['menu:demo']} />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
