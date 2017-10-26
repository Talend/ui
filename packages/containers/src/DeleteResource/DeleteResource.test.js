import React from 'react';
import { shallow } from 'enzyme';
import { store } from '@talend/react-cmf/lib/mock';
import { Map, List } from 'immutable';

import Container from './DeleteResource.container';
import Connected from './DeleteResource.connect';

const state = store.state();
const value = new Map({ id: 'myID', label: 'myLabel' });
const collections = new Map({
	myResourceType: new List([value]),
});
const settings = {
	actions: {
		'dialog:delete:validate': {
			id: 'dialog:delete:validate',
			label: 'Yes',
			bsStyle: 'danger',
			actionCreator: 'deleteResource:validate',
		},
		'dialog:delete:cancel': {
			id: 'dialog:delete:cancel',
			label: 'No',
			actionCreator: 'deleteResource:cancel',
		},
	},
};
state.cmf = {
	collections,
	settings,
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
		'form-actions': ['dialog:delete:cancel', 'dialog:delete:validate'],
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
