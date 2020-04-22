import React from 'react';
import { mount } from 'enzyme';
import SidePanel from './SidePanel.component';

describe('SidePanel', () => {
	it('should trigger callback on toggle click (controlled)', () => {
		// given
		const onClick = jest.fn();
		const onToggleDock = jest.fn();
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk', onClick },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o', onClick },
			{ label: 'Favorites', icon: 'fa fa-star', onClick },
		];

		// when
		const wrapper = mount(
			<SidePanel id="sp" actions={actions} onToggleDock={onToggleDock} docked />,
		);
		expect(wrapper.find('nav').prop('className')).toEqual(expect.stringContaining('docked'));
		wrapper.find('button#sp-toggle-dock').simulate('click');

		// then
		expect(onToggleDock).toBeCalled();
		expect(wrapper.find('nav').prop('className')).toEqual(expect.stringContaining('docked'));
	});

	it('should toggle panel (uncontrolled)', () => {
		// given
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk', href: '/preparations' },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o', href: '/datasets' },
			{ label: 'Favorites', icon: 'fa fa-star', href: '/favorites' },
		];

		// when
		const wrapper = mount(<SidePanel id="sp" actions={actions} docked />);
		expect(wrapper.find('nav').prop('className')).toEqual(expect.stringContaining('docked'));
		wrapper.find('button#sp-toggle-dock').simulate('click');

		// then
		expect(wrapper.find('nav').prop('className')).toEqual(expect.not.stringContaining('docked'));
	});
});
