/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import ColumnChooser from '.';
import { ListContext } from '../context';
import ColumnChooserButton from '../../Toolbar/ColumnChooserButton';
import getDefaultT from '../../../translate';

describe('ColumnChooser', () => {
	let defaultContext;

	beforeEach(() => {
		defaultContext = {
			columns: [
				{ dataKey: 'foo', label: 'Foo' },
				{ dataKey: 'bar', label: 'Bar' },
			],
			setVisibleColumns: jest.fn(),
			t: getDefaultT(),
		};
	});

	it('should render column chooser component', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" />
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find(ColumnChooserButton)).toBeDefined();
	});

	it('should update columns', () => {
		// given
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" />
			</ListContext.Provider>,
		);
		const onSubmit = wrapper.find(ColumnChooserButton).prop('onSubmit');

		// when
		onSubmit(null, [
			{ key: 'foo', hidden: true },
			{ key: 'bar', hidden: false },
		]);

		// then
		expect(defaultContext.setVisibleColumns).toBeCalledWith(['bar']);
	});
});
