import React from 'react';
import { mount } from 'enzyme';
import { mock } from '@talend/react-cmf';

import Actions from './Actions.connect';

describe('Actions', () => {
	it('should render', () => {
		const context = mock.store.context();
		const wrapper = mount(
			<Actions actionIds={['menu:demo']} />,
			mock.Provider.getEnzymeOption(context),
		);
		expect(wrapper.find(Actions.CMFContainer).props().actions[0]).toEqual({
			actionId: 'menu:demo',
		});
	});
});
