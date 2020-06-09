import React from 'react';
import { mount } from 'enzyme';
import getDefaultT from '../../../../../translate';
import Component from './ColumnChooserFooter.component';
import { ColumnChooserProvider } from '../columnChooser.context';

describe('ColumnChooserFooter', () => {
	it('should render by default', () => {
		// given
		const id = 'footer-context-id';
		// when
		const wrapper = mount(
			<ColumnChooserProvider
				value={{
					id,
					t: getDefaultT(),
				}}
			>
				<Component />
			</ColumnChooserProvider>,
		);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render the children', () => {
		// given
		const Children = () => <div id="my-child">Hello world</div>;
		// when
		const wrapper = mount(
			<Component>
				<Children />
			</Component>,
		);
		// then
		expect(wrapper.find('div#my-child').text()).toBe('Hello world');
	});
});
