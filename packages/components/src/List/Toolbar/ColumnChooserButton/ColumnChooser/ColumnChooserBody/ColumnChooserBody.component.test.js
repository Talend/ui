import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { ColumnChooserProvider } from '../columnChooser.context';
import getDefaultT from '../../../../../translate';

import Component from './ColumnChooserBody.component';

const columns = [
	{ visible: true, label: 'col1', locked: true, order: 1 },
	{ visible: true, label: 'col2', locked: true, order: 2 },
	{ visible: true, label: 'col3', order: 3 },
	{ visible: false, label: 'col4', order: 4 },
	{ visible: true, label: 'col5', order: 5 },
	{ visible: false, label: 'col6', order: 6 },
];

describe('ColumnChooserBody', () => {
	it('should render the columns rows and the column select all', () => {
		// Given
		const contextValues = {
			columns,
			id: 'body-context-id',
			onChangeVisibility: jest.fn(),
			onSelectAll: jest.fn(),
			selectAll: true,
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<ColumnChooserProvider value={contextValues}>
				<Component />
			</ColumnChooserProvider>,
		);
		// Then
		expect(wrapper.find('.tc-column-chooser-row.theme-tc-column-chooser-row')).toHaveLength(
			columns.length + 1,
		);
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with children', () => {
		// Given
		const contextValues = {
			columns,
		};
		const Children = <div id="my-child">Hello</div>;
		// When
		const wrapper = mount(
			<ColumnChooserProvider value={contextValues}>
				<Component>{Children}</Component>
			</ColumnChooserProvider>,
		);
		// Then
		expect(wrapper.find('div#my-child')).toHaveLength(1);
	});
	it('should call the onChangeVisibility when onChange is triggered on the column chooser table', () => {
		const onChangeVisibility = jest.fn();
		// Given
		const contextValues = {
			columns,
			id: 'body-context-id',
			onChangeVisibility,
			onSelectAll: jest.fn(),
			selectAll: true,
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<ColumnChooserProvider value={contextValues}>
				<Component />
			</ColumnChooserProvider>,
		);
		expect(wrapper.find('input#body-context-id-body-checkbox-col3').prop('checked')).toBe(true);
		act(() => {
			wrapper.find('input#body-context-id-body-checkbox-col3').simulate('change');
		});
		wrapper.update();
		// Then
		expect(onChangeVisibility).toHaveBeenNthCalledWith(1, true, 'col3');
	});
});
