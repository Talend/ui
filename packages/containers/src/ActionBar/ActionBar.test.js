import { mount } from 'enzyme';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cmf, { mock } from '@talend/react-cmf';

import Container from './ActionBar.connect';
import Action from '../Action';
import Actions from '../Actions';
import ActionDropdown from '../ActionDropdown';
import ActionSplitDropdown from '../ActionSplitDropdown';

jest.unmock('@talend/design-system');

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
			id: 'menu:demo',
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

const context = mock.store.context();
const Provider = mock.Provider;

describe('Container ActionBar', () => {
	beforeAll(() => {
		context.registry = cmf.registry.getRegistry();
		cmf.component.registerMany({
			Action,
			Actions,
			ActionDropdown,
			ActionSplitDropdown,
		});
	});

	it('should pass the props', () => {
		// context.registry = {};
		const props = { actions };
		render(
			<Provider {...context}>
				<Container {...props} />
			</Provider>,
		);
		const Preparations = screen.getByRole('button', { name: 'Preparations' });
		const left = Preparations.parentElement;
		const Dataset = screen.getByRole('button', { name: 'Datasets' });
		const right = Dataset.parentElement;
		expect(left).toHaveClass('navbar-left');
		expect(right).toHaveClass('navbar-right');
		expect(screen.getAllByRole('button')).toHaveLength(6);
	});

	it('should compute props using CMF with array of string', () => {
		const state = mock.store.state();
		state.cmf.settings.actions = {
			...state.cmf.settings.actions,
			'menu:article': {
				label: 'Article',
				icon: 'article',
				name: 'article',
				onClick: jest.fn(),
			},
			'menu:demo': {
				label: 'Demo',
				name: 'demo',
				icon: 'demo',
				onClick: jest.fn(),
			},
		};

		const actionIds = {
			left: ['menu:demo', 'menu:article'],
			right: [
				{
					displayMode: 'splitDropdown',
					id: 'foo',
					name: 'menu:demo',
					label: 'Demo split',
					onClick: jest.fn(),
					items: [{ label: 'sub foo', onClick: jest.fn() }],
				},
			],
		};

		render(
			<Provider {...context} state={state}>
				<Container actionIds={actionIds} />
			</Provider>,
		);
		expect(screen.getAllByRole('button')).toHaveLength(4);
		expect(screen.getByText('Demo')).toBeInTheDocument();
		expect(screen.getByText('Article')).toBeInTheDocument();
		expect(screen.getByText('Demo split')).toBeInTheDocument();
	});
});
