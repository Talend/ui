import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import Inject from '@talend/react-components/lib/Inject';

import Component from './HomeListView.component';
import Connected from './HomeListView.connect';

const sidepanel = {
	actionIds: ['menu:demo', 'menu:article'],
};

const list = {
	columns: [{ key: 'id', label: 'Id' }, { key: 'label', label: 'Name' }],
	titleProps: {
		key: 'label',
	},
};

const actions = {};

const toolbar = {
	sort: {
		field: 'id',
		options: [{ id: 'id', name: 'Id' }, { id: 'label', name: 'Name' }],
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

describe('Component HomeListView', () => {
	it('should render with object props', () => {
		const wrapper = shallow(
			<Component header={{ app: 'hello app' }} sidepanel={sidepanel} list={listProps}>
				<h1>Hello children</h1>
			</Component>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should be able to render theme', () => {
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

	it('should render with element props', () => {
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

	it('should children transformed as array in props.drawers', () => {
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
				children={children}
			/>,
		);
		expect(wrapper.props().drawers).toMatchSnapshot();
	});
	it('should Inject components.drawer into props.drawers', () => {
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
	it('should connect HomeListView', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Component.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Component);
	});
});
