/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import getDefaultT from '../../../../../translate';
import Component from './ColumnChooserHeader.component';
import { ColumnChooserProvider } from '../columnChooser.context';

// eslint-disable-next-line react/prop-types
const HeaderWithContext = ({ children, id, t = getDefaultT(), ...rest }) => (
	<ColumnChooserProvider
		value={{
			id,
			t,
		}}
	>
		<Component {...rest}>{children}</Component>
	</ColumnChooserProvider>
);

describe('Name of the group', () => {
	it('should render by default', () => {
		// Given
		const id = 'col-chooser-id';
		// When
		const wrapper = mount(<HeaderWithContext id={id} />);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render the children', () => {
		// Given
		const id = 'col-chooser-id';
		const Children = () => <div id="my-child">Hello world</div>;
		// When
		const wrapper = mount(
			<HeaderWithContext id={id}>
				<Children />
			</HeaderWithContext>,
		);
		// Then
		expect(wrapper.find('div#my-child').text()).toBe('Hello world');
	});
});
