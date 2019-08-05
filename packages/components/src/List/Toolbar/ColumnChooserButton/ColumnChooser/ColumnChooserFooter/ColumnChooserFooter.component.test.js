/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import getDefaultT from '../../../../../translate';
import Component from './ColumnChooserFooter.component';
import { ColumnChooserProvider } from '../columnChooser.context';

const FooterWithContext = ({
	children,
	id,
	onSelectAll,
	t = getDefaultT(),
	selectAll,
	...rest
}) => (
	<ColumnChooserProvider
		value={{
			id,
			onSelectAll,
			t,
			selectAll,
		}}
	>
		<Component {...rest}>{children}</Component>
	</ColumnChooserProvider>
);

describe('ColumnChooserFooter', () => {
	it('should render by default', () => {
		// given
		const id = 'footer-context-id';
		// when
		const wrapper = mount(<FooterWithContext id={id} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render the children', () => {
		// given
		const id = 'footer-context-id';
		const Children = () => <div id="my-child">Hello world</div>;
		// when
		const wrapper = mount(
			<FooterWithContext id={id}>
				<Children />
			</FooterWithContext>,
		);
		// then
		expect(wrapper.find('div#my-child').text()).toBe('Hello world');
	});
});
