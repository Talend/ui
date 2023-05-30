// rewrite tests using react-testing-library
import { screen, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import Inject from '@talend/react-components/lib/Inject';
import cmf, { mock } from '@talend/react-cmf';
import { prepareCMF } from '@talend/react-cmf/src/mock/rtl';

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
		List: () => <div>List</div>,
		HeaderBar: () => <div>HeaderBar</div>,
		SidePanel: () => <div>SidePanel</div>,
	},
	registry: {
		'_.route.component:component': () => <div>mock</div>,
		'actionCreator:myactionCreator': () => {},
		'actionCreator:cmf.saga.start': jest.fn(),
		'actionCreator:cmf.saga.stop': jest.fn(),
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
window.URL.createObjectURL = jest.fn();
window.URL.revokeObjectURL = jest.fn();
describe('Component HomeListView', () => {
	it('should render with object props', async () => {
		const { container } = render(
			await prepareCMF(
				<Connected
					header={{ app: 'hello app' }}
					sidepanel={sidepanel}
					list={listProps}
					// getComponent={cmf.component.get}
					// dispacth={jest.fn()}
					// dispacthActionCreator={jest.fn()}
				>
					<h1>Hello children</h1>
				</Connected>,
				{ cmfModule },
			),
		);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.queryByText('Download details')).not.toBeInTheDocument();
	});

	xit('should be able to render theme', () => {
		const wrapper = shallow(
			<Component
				hasTheme
				header={<div>hello app</div>}
				sidepanel={<div>hello sidepanel</div>}
				list={<div>hello list</div>}
			>
				<h1>Hello children</h1>
			</Component>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	xit('should render with element props', () => {
		const wrapper = shallow(
			<Component
				header={<div>hello app</div>}
				sidepanel={<div>hello sidepanel</div>}
				list={<div>hello list</div>}
			>
				<h1>Hello children</h1>
			</Component>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	xit('should children transformed as array in props.drawers', () => {
		const children = {
			props: {
				foo: 'bar',
				children: {
					props: {
						label: 'foo',
						children: {
							props: {
								children: null,
							},
						},
					},
				},
			},
		};
		const wrapper = shallow(
			<Component
				header={<div>hello app</div>}
				sidepanel={<div>hello sidepanel</div>}
				list={<div>hello list</div>}
			>
				{children}
			</Component>,
		);
		expect(wrapper.props().drawers).toMatchSnapshot();
	});
	xit('should Inject components.drawer into props.drawers', () => {
		const components = {
			drawers: [{ component: 'Foo' }],
		};
		const getComponent = jest.fn(() => () => 'hello');
		const wrapper = shallow(
			<Component
				header={<div>hello app</div>}
				sidepanel={<div>hello sidepanel</div>}
				list={<div>hello list</div>}
				components={components}
				getComponent={getComponent}
			/>,
		);
		expect(wrapper.props().drawers[0].type).toBe(Inject);
		expect(wrapper.props().drawers[0].props).toEqual({
			getComponent,
			component: 'Foo',
		});
	});
});

describe('Connected HomeListView', () => {
	xit('should connect HomeListView', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Component.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Component);
	});
});
