/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { ColumnChooserProvider } from '../columnChooser.context';
import { act } from 'react-dom/test-utils';
import getDefaultT from '../../../../../translate';

import Component from './ColumnChooserBody.component';

const columns = [
	{ hidden: undefined, label: 'col1', locked: true, order: 1 },
	{ hidden: undefined, label: 'col2', locked: true, order: 2 },
	{ hidden: undefined, label: 'col3', order: 3 },
	{ hidden: undefined, label: 'col4', order: 4 },
	{ hidden: true, label: 'col5', order: 5 },
	{ hidden: undefined, label: 'col6', order: 6 },
];

describe('ColumnChooserBody', () => {
	it('should render the columns rows and the column select all', () => {
		// Given
		const contextValues = {
			columnsChooser: columns,
			id: 'body-context-id',
			onChangeVisibility: () => () => {},
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
		const Children = <div id="my-child">Hello</div>;
		// When
		const wrapper = mount(<Component>{Children}</Component>);
		// Then
		expect(wrapper.find('div#my-child')).toHaveLength(1);
	});
	it('should call the onChangeVisibility when checkbox trigger change', () => {
		const onChange = jest.fn();
		// Given
		const contextValues = {
			columnsChooser: columns,
			id: 'body-context-id',
			onChangeVisibility: () => onChange,
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
		// expect(wrapper.find('.tc-column-chooser-row.theme-tc-column-chooser-row')).toHaveLength(
		// 	columns.length + 1,
		// );
		// expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.find('input#body-context-id-body-checkbox-col3').prop('checked')).toBe(true);
		act(() => wrapper.find('input#body-context-id-body-checkbox-col3').simulate('click'));
		wrapper.update();
		expect(wrapper.find('input#body-context-id-body-checkbox-col3').prop('checked')).toBe(false);
	});
});
