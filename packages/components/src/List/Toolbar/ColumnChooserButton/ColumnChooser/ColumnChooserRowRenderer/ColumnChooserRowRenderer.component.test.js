import React from 'react';
import { mount } from 'enzyme';
import Component from './ColumnChooserRowRenderer.component';

describe('ColumnChooserRowRenderer', () => {
	it('should render', () => {
		// given
		const id = 'row-renderer-context-id';
		const Children = () => <div id="my-child">Hello World</div>;
		// when
		const wrapper = mount(
			<Component id={id}>
				<Children />
			</Component>,
		);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
