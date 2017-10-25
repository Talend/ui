import React from 'react';
import { shallow } from 'enzyme';
import { store } from '@talend/react-cmf/lib/mock';
import { Map } from 'immutable';

import Container from './DeleteResource.container';
import Connected from './DeleteResource.connect';

const state = store.state();
state.cmf = {
	collections: new Map({ resource: new Map({ myId: 'myResourceId' }) }),
	settings: {
		views: [],
		actions: new Map({
			'dialog:delete:validate': { id: 'dialog:delete:validate' },
			'dialog:delete:cancel': { id: 'dialog:delete:cancel' },
		}),
	},
};

const context = {
	store: {
		getState: () => state,
	},
};

describe('Container DeleteResource', () => {
	const props = {
		resourceInfo: { uri: '/myEndpoint', resourceType: 'myResourceType' },
		header: 'My header title',
		params: { id: 'myIdResource' },
	};
	it('should render', () => {
		const wrapper = shallow(<Container {...props} />, { context });
		expect(wrapper).toMatchSnapshot();
	});
	it('get the resource and return an object', () => {});
	it('build a data object and return it', () => {});
});

describe('Connected DeleteResource', () => {
	it('should connect TestGenerator', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});
