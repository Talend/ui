import React from 'react';
import { shallow } from 'enzyme';

import WithDrawer from './WithDrawer.component';
import Drawer from './../Drawer';

describe('WithDrawer', () => {
	it('should wrap drawers in a container', () => {
		// given
		const drawers = [
			<div>My first drawer</div>,
			<div>My second drawer</div>,
		];

		// when
		const wrapper = shallow(
			<WithDrawer drawers={drawers}>
				<div>My content</div>
			</WithDrawer>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
