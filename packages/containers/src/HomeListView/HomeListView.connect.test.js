// rewrite tests using react-testing-library
import { screen, render } from '@testing-library/react';
import { fromJS } from 'immutable';
// eslint-disable-next-line @talend/import-depth
import { prepareCMF } from '@talend/react-cmf/lib/mock/rtl';

import Component from './HomeListView.component';
import Connected from './HomeListView.connect';

jest.unmock('@talend/design-system');

const sidepanel = {
	actionIds: ['menu:article'],
};

const list = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Name' },
	],
	titleProps: {
		key: 'label',
	},
};

const actions = {};

const toolbar = {
	sort: {
		field: 'id',
		options: [
			{ id: 'id', name: 'Id' },
			{ id: 'label', name: 'Name' },
		],
	},
	filter: {
		placeholder: 'find an object',
	},
};

const items = fromJS([
	{
		id: 1,
		label: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
]);

const listProps = {
	list,
	actions,
	toolbar,
	items,
};

const cmfModule = {
	id: 'test-me',
	render: false,
	components: {
		List: () => <div data-testid="List">List</div>,
		HeaderBar: () => <div data-testid="HeaderBar">HeaderBar</div>,
		SidePanel: () => <div data-testid="SidePanel">SidePanel</div>,
	},
	preloadedState: {
		cmf: {
			settings: {
				actions: {
					'menu:article': {
						label: 'Article',
						icon: 'talend-file-xls-o',
					},
				},
				props: {},
			},
		},
	},
};

describe('Connected HomeListView', () => {
	it('should connect HomeListView', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Component.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Component);
	});
	it('should render', async () => {
		const { container } = render(
			await prepareCMF(
				<Connected header={{ app: 'hello app' }} sidepanel={sidepanel} list={listProps} />,
				{ cmfModule },
			),
		);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByTestId('List')).toBeInTheDocument();
		expect(screen.getByTestId('HeaderBar')).toBeInTheDocument();
		expect(screen.getByTestId('SidePanel')).toBeInTheDocument();
	});
});
