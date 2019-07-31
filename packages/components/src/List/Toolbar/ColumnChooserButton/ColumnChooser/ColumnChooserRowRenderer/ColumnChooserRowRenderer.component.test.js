import React from 'react';
import { mount } from 'enzyme';
import Component from './ColumnChooserRowRenderer.component';
import { ColumnChooserProvider } from '../columnChooser.context';

// eslint-disable-next-line react/prop-types
const RowRendererWithContext = ({ children, id }) => (
	<ColumnChooserProvider
		value={{
			id,
		}}
	>
		<Component>{children}</Component>
	</ColumnChooserProvider>
);

describe('ColumnChooserRowRenderer', () => {
	it('should render', () => {
		// given
		const id = 'row-renderer-context-id';
		const Children = () => <div id="my-child">Hello World</div>;
		// when
		const wrapper = mount(
			<RowRendererWithContext id={id}>
				<Children />
			</RowRendererWithContext>,
		);
		// then
		expect(wrapper.find('div#my-child').text()).toBe('Hello World');
		expect(wrapper.html()).toMatchSnapshot();
	});
});
