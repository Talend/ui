import React from 'react';
import { shallow } from 'enzyme';

import {
	TALEND_QUALITY_KEY,
	TALEND_QUALITY_EMPTY_KEY,
	TALEND_QUALITY_INVALID_KEY,
	TALEND_QUALITY_VALID_KEY,
} from '../constants';

import DefaultHeaderRenderer from './header-grid.component';

describe('#DefaultBooleanCellRenderer', () => {
	it('should render DefaultBooleanCellRenderer', () => {
		const onFocusedColumn = jest.fn();
		const wrapper = shallow(
			<DefaultHeaderRenderer
				onFocusedColumn={onFocusedColumn}
				column={{
					colId: 'colId',
					colDef: {
						type: 'string',
						[TALEND_QUALITY_KEY]: {
							[TALEND_QUALITY_INVALID_KEY]: 33,
							[TALEND_QUALITY_EMPTY_KEY]: 33,
							[TALEND_QUALITY_VALID_KEY]: 34,
						},
					},
				}}
				displayName="Title"
			/>,
		);
		wrapper.find('button').simulate('click');
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(onFocusedColumn).toHaveBeenCalledWith('colId');
	});
});
