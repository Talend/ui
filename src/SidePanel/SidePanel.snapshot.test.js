import React from 'react';
import renderer from 'react-test-renderer';
import SidePanel from './SidePanel.component';

jest.mock('react-dom');

describe('SidePanel', () => {
	it('should render expanded menu', () => {
		// given
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk' },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o' },
			{ label: 'Favorites', icon: 'fa fa-star', active: true },
		];
		const docked = false;

		// when
		const sidePanel = <SidePanel actions={actions} docked={docked} />;
		const wrapper = renderer.create(sidePanel).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render docked menu', () => {
		// given
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk' },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o' },
			{ label: 'Favorites', icon: 'fa fa-star', active: true },
		];
		const docked = true;

		// when
		const sidePanel = <SidePanel actions={actions} docked={docked} />;
		const wrapper = renderer.create(sidePanel).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
