import React from 'react';
import { mount } from 'enzyme';
import ActionBar from './ActionBar.component';
import { Action } from '../Actions';

describe('ActionBar', () => {
	it('should trigger onClick callback on Action click', () => {
		// given
		const onClickMock = jest.fn();
		const props = {
			selected: 0,
			actions: {
				left: [
					{ label: 'Preparations', icon: 'fa fa-asterisk', onClick: onClickMock },
				],
			},
		};

		// when
		const actionBar = (
			<ActionBar {...props} />
		);
		const wrapper = mount(actionBar);
		wrapper.find(Action).at(0).simulate('click');

		// then
		expect(onClickMock).toHaveBeenCalled();
	});
});
