import React from 'react';
import { shallow } from 'enzyme';

import {
	TALEND_QUALITY_KEY,
	TALEND_QUALITY_EMPTY_KEY,
	TALEND_QUALITY_INVALID_KEY,
	TALEND_QUALITY_VALID_KEY,
} from '../../constants';

import DefaultHeaderRenderer from './DefaultHeaderRenderer.component';
import QualityBar from './QualityBar.component';

describe('#DefaultHeaderGrid', () => {
	it('should render DefaultHeaderGrid', () => {
		const onFocusedColumn = jest.fn();
		const onKeyDown = jest.fn();
		const event = {};
		const wrapper = shallow(
			<DefaultHeaderRenderer
				onFocusedColumn={onFocusedColumn}
				onKeyDown={onKeyDown}
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
		wrapper.find('button').simulate('keydown', event);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(onFocusedColumn).toHaveBeenCalledWith('colId');
		expect(onKeyDown).toHaveBeenCalledWith(event, 'colId');
	});

	it('should render DefaultHeaderGrid without QualityBar', () => {
		const onFocusedColumn = jest.fn();
		const wrapper = shallow(
			<DefaultHeaderRenderer
				onFocusedColumn={onFocusedColumn}
				column={{
					colId: 'colId',
					colDef: {
						type: 'string',
					},
				}}
				displayName="Title"
			/>,
		);

		expect(wrapper.find(QualityBar).length).toBe(0);
	});
});
