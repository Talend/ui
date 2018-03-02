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
				left: [{ label: 'Preparations', icon: 'fa fa-asterisk', onClick: onClickMock }],
			},
		};

		// when
		const actionBar = <ActionBar {...props} />;
		const wrapper = mount(actionBar);
		wrapper
			.find(Action)
			.at(0)
			.simulate('click');

		// then
		expect(onClickMock).toHaveBeenCalled();
	});

	it('should support custom component', () => {
		// given
		function MyAction(props) {
			return <div className="my-custom-action" {...props} />;
		}
		const props = {
			selected: 0,
			actions: {
				left: [{ label: 'Preparations', icon: 'talend-preparation' }],
			},
			getComponent: key => {
				if (key === 'Action') {
					return MyAction;
				}
				return undefined;
			},
		};

		// when
		const actionBar = <ActionBar {...props} />;
		const wrapper = mount(actionBar);
		const render = wrapper.find('.my-custom-action').first();

		// then
		expect(render.hasClass('my-custom-action')).toBe(true);
		expect(render.name()).toBe('div');
		expect(render.props()).toMatchSnapshot();
	});
});
