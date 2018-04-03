import React from 'react';
import { shallow } from 'enzyme';
import { store } from '@talend/react-cmf/lib/mock';
import Immutable from 'immutable';

import { DeleteResource } from './DeleteResource.container';
import Connected from './DeleteResource.connect';

const state = store.state();
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
	settings,
};

const context = {
	store: {
		getState: () => state,
	},
};

describe('Container DeleteResource', () => {
	it('should render with proper resourceInfo params', () => {
		const props = {
			uri: '/myEndpoint',
			resourceType: 'myResourceType',
			resource: new Immutable.Map({ label: 'myLabel' }),
			header: 'My header title',
			params: { id: 'myResourceID' },
			resourceTypeLabel: 'resourceLabel',
			female: true,
			'validate-action': 'dialog:delete:validate',
			'cancel-action': 'dialog:delete:cancel',
		};
		const wrapper = shallow(<DeleteResource {...props} />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render with wrong resourceInfo params', () => {
		const props = {
			uri: '/myEndpoint',
			resourceType: 'unknownResourceType',
			header: 'My header title',
			params: { id: 'myResourceID' },
			'validate-action': 'dialog:delete:validate',
			'cancel-action': 'dialog:delete:cancel',
		};
		const wrapper = shallow(<DeleteResource {...props} />, { context });
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Connected DeleteResource', () => {
	it('should connect TestGenerator', () => {
		expect(Connected.displayName).toBe('Connect(CMF(Translate(Container(DeleteResource))))');
		expect(Connected.WrappedComponent).toBe(DeleteResource);
	});
});
