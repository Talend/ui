import React from 'react';
import { Button } from 'react-bootstrap';
import { mount } from 'enzyme';
import SidePanel from './SidePanel.component';

describe('SidePanel', () => {
	it('should trigger toggleDock callback on toggle click', () => {
		// given
		const onClick = jest.fn();
		const onToggleDock = jest.fn();
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk', onClick },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o', onClick },
			{ label: 'Favorites', icon: 'fa fa-star', onClick },
		];
		const docked = false;

		// when
		const sidePanel = (
			<SidePanel
				actions={actions}
				onToggleDock={onToggleDock}
				docked={docked}
				toggleIcon={'fa fa-arrow-left'}
			/>
		);
		const wrapper = mount(sidePanel);
		wrapper
			.find(Button)
			.at(0)
			.simulate('click');

		// then
		expect(onToggleDock).toBeCalled();
	});

	it('should work even if there is no id, label, or action id', () => {
		const actions = [{}, {}, {}];
		const sidePanel = <SidePanel actions={actions} />;

		expect(() => {
			mount(sidePanel);
		}).not.toThrow();
	});
});
