import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';
import Immutable from 'immutable';

import { DeleteResource } from './DeleteResource.container';
import Connected, { mapStateToProps } from './DeleteResource.connect';

const state = mock.store.state();
const settings = {};
state.cmf = {
	settings,
};
state.cmf.collections = new Immutable.Map({
	foo: new Immutable.List([new Immutable.Map({ id: '123' })]),
});

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
		expect(Connected.displayName).toBe(
			'Connect(CMF(withI18nextTranslation(Container(DeleteResource))))',
		);
		expect(Connected.WrappedComponent).toBe(DeleteResource);
	});
	describe('mapStateToProps', () => {
		it('should return empty object if no resourceType', () => {
			expect(mapStateToProps({}, {})).toEqual({});
		});
		it('should return resourceId from router', () => {
			expect(mapStateToProps({}, { params: { id: '123' } }).resourceId).toEqual('123');
		});
		it('should return the props.resource corresponding to resourceId', () => {
			expect(mapStateToProps(state, { resourceType: 'foo', resourceId: '123' }).resource).toBe(
				state.cmf.collections.get('foo').get(0),
			);
		});
		it('should return the props.resource corresponding to routeParams.id', () => {
			expect(mapStateToProps(state, { resourceType: 'foo', params: { id: '123' } }).resource).toBe(
				state.cmf.collections.get('foo').get(0),
			);
		});

		it('should return the props.resource from the own props', () => {
			const resource = {};
			expect(mapStateToProps(state, { resource }).resource).toBe(resource);
		});
	});
});
