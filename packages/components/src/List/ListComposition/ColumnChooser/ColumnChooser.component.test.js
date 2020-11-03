/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import toJsonWithoutI18n from '../../../../test/props-without-i18n';
import ColumnChooser from './ColumnChooser.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

describe('ColumnChooser', () => {
	const defaultContext = {
		columns: [],
		setVisibleColumns: jest.fn(),
		t: getDefaultT(),
	};

	it('should render column chooser component', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" />
			</ListContext.Provider>,
		);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});
});
