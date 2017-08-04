import React from 'react';
import { shallow } from 'enzyme';

import WithDrawer from './WithDrawer.component';
import Drawer from './../Drawer';

describe('WithDrawer', () => {
	it('should inject route as key if available', () => {
		const drawer = <Drawer route={{ path: 'path' }} >test</Drawer>;
		const wrapper = shallow(<WithDrawer drawers={[drawer]} />);
		expect(wrapper.children().children().key()).toEqual('path');
	});

	it('should inject generated key if route isn\'t available', () => {
		const drawer = <Drawer>test</Drawer>;
		const wrapper = shallow(<WithDrawer drawers={[drawer]} />);
		expect(wrapper.children().children().key()).toEqual('0');
	});
});
