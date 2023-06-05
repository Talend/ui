import { render, screen } from '@testing-library/react';
import cmf, { mock } from '@talend/react-cmf';
import Immutable from 'immutable';

import { DeleteResource } from './DeleteResource.container';
import Connected, { mapStateToProps } from './DeleteResource.connect';

jest.unmock('@talend/design-system');

const state = mock.store.state();
const settings = {};
state.cmf = {
	settings,
};
state.cmf.collections = new Immutable.Map({
	foo: new Immutable.List([new Immutable.Map({ id: '123' })]),
});

describe('Container DeleteResource', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
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
		const { container } = render(
			<App {...mock.store.context(state)}>
				<DeleteResource {...props} />
			</App>,
		);
		expect(container.nextSibling).toMatchSnapshot();
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

		render(
			<App {...mock.store.context(state)}>
				<DeleteResource {...props} />
			</App>,
		);
		expect(screen.getByText('My header title')).toBeVisible();
		expect(screen.getByText('CANCEL')).toBeVisible();
		expect(screen.getByText('REMOVE')).toBeVisible();
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
