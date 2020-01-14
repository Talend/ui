import React from 'react';
import { mount } from 'enzyme';

import ListToolbar from './ListToolbar.component';

describe('List Toolbar', () => {
	it('should display nav with children', () => {
		// when
		const wrapper = mount(
			<ListToolbar>
				<div>Hello</div>
			</ListToolbar>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should display nav with li and separator', () => {
		// when
		const wrapper = mount(
			<ListToolbar>
				<ListToolbar.Right>
					<div>Hello</div>
					<div>World</div>
				</ListToolbar.Right>
			</ListToolbar>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
