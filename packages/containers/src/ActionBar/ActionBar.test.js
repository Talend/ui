import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';

import Container from './ActionBar.connect';

const action = jest.fn();

const actions = {
	left: [
		{
			label: 'Preparations',
			icon: 'fa fa-asterisk',
			onClick: action,
			bsStyle: 'primary',
		},
		{
			displayMode: 'dropdown',
			label: 'related items',
			icon: 'fa fa-file-excel-o',
			items: [
				{
					label: 'document 1',
					onClick: action,
				},
				{
					label: 'document 2',
					onClick: action,
				},
			],
		},
	],
	right: [
		{
			label: 'Datasets',
			icon: 'fa fa-file-excel-o',
			onClick: action,
		},
		{
			label: 'Favorites',
			icon: 'fa fa-star',
			onClick: action,
		},
		{
			displayMode: 'btnGroup',
			actions: [
				{
					label: 'document 1',
					onClick: action,
				},
				{
					label: 'document 2',
					onClick: action,
				},
			],
		},
	],
};

const actionIds = {
	left: [
		'menu:demo',
		'menu:article',
		{
			displayMode: 'btnGroup',
			actions: ['menu:demo', 'menu:article'],
		},
	],
	right: [
		{
			displayMode: 'splitDropdown',
			name: 'menu:demo',
			items: ['menu:article'],
		},
	],
};

describe('Container ActionBar', () => {
	it('should pass the props', () => {
		const props = { actions };
		const wrapper = shallow(<Container {...props} />, { context: mock.store.context() });
		expect(wrapper.props()).toMatchSnapshot();
	});
	it('should compute props using CMF with array of string', () => {
		const wrapper = shallow(<Container actionIds={actionIds} />, { context: mock.store.context() });
		expect(wrapper.props()).toMatchSnapshot();
	});
});
