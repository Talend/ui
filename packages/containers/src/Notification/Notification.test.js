import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { List, Map } from 'immutable';

import { Notification as Component } from 'react-talend-components';
import Container, { DEFAULT_STATE } from './Notification.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './Notification.connect';

const initialState = new Map({
	notifications: new List([
		{
			id: 'story-1',
			message: 'This is a feedback of your operation1, This is a feedback of your operation1',
		},
		{
			id: 'story-2',
			type: 'error',
			message: ['This is a feedback of your operation2', 'This is a feedback of your operation1, This is a feedback of your operation1'],
		},
		{
			id: 'story-3',
			type: 'warning',
			message: ['This is a feedback of your operation3', 'details'],
		},

	]),
});

describe('Container Notification', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected Notification', () => {
	it('should connect Notification', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					Notification: {
						Notification: DEFAULT_STATE.toJS(),
					},
				}),
			},
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		const dispatch = () => {};
		const props = mapDispatchToProps(dispatch);
		expect(typeof props).toBe('object');
	});
});

