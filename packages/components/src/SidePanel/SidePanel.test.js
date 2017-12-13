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

	it('should trigger action callback on action click', () => {
		// given
		const onPreparationsClick = jest.fn();
		const onDatasetsClick = jest.fn();
		const onFavoritesClick = jest.fn();
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk', onClick: onPreparationsClick },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o', onClick: onDatasetsClick },
			{ label: 'Favorites', icon: 'fa fa-star', onClick: onFavoritesClick },
		];
		const docked = false;

		// when
		const sidePanel = (
			<SidePanel
				actions={actions}
				docked={docked}
				onToggleDock={jest.fn()}
				toggleIcon={'fa fa-arrow-left'}
			/>
		);
		const wrapper = mount(sidePanel);
		wrapper
			.find('nav')
			.find(Button)
			.at(2)
			.simulate('click');

		// then
		expect(onPreparationsClick).not.toBeCalled();
		expect(onDatasetsClick).toBeCalled();
		expect(onFavoritesClick).not.toBeCalled();
	});

	it('should accept custom action ids', () => {
		const actions = [
			{ label: 'Preparations', id: 'preparation-custom-id' },
			{ label: 'Datasets', id: 'datasets-custom-id' },
			{ label: 'Favorites', id: 'favs-custom-id' },
		];
		const sidePanel = <SidePanel id="test" actions={actions} />;
		const wrapper = mount(sidePanel);

		expect(wrapper.find('button#test-nav-preparation-custom-id').text()).toEqual('Preparations');
		expect(wrapper.find('button#test-nav-datasets-custom-id').text()).toEqual('Datasets');
		expect(wrapper.find('button#test-nav-favs-custom-id').text()).toEqual('Favorites');
	});

	it('should work even if there is no id, label, or action id', () => {
		const actions = [{}, {}, {}];
		const sidePanel = <SidePanel actions={actions} />;

		expect(() => {
			mount(sidePanel);
		}).not.toThrow();
	});
});
