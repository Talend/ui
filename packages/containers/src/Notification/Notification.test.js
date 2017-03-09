import React from 'react';
import renderer from 'react-test-renderer';
import { store, Provider } from 'react-cmf/lib/mock';
import { fromJS, Map } from 'immutable';
import Container, { DEFAULT_STATE } from './Notification.container';
import Connected, {
	mergeProps,
} from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';

describe('Container Notification', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container />
			</Provider>,
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected Notification', () => {
	it('should connect Notification', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('Notification.pushNotification', () => {
	it('should add a Notification in the state', () => {
		const state = store.state();
		state.cmf.components = fromJS({
			'Container(Notification)': {
				Notification: {
					notifications: [],
				},
			},
		});
		const notification = { message: 'hello world' };
		const newState = pushNotification(state, notification);
		expect(newState).not.toBe(state);
		const notifications = newState.cmf.components.getIn(['Container(Notification)', 'Notification', 'notifications']);
		expect(notifications.size).toBe(1);
		expect(notifications.get(0).message).toBe('hello world');
	});

	it('should delete all Notification in the state', () => {
		const state = store.state();
		state.cmf.components = fromJS({
			'Container(Notification)': {
				Notification: {
					notifications: [
						{ message: 'hello world' },
						{ message: 'hello world2' },
					],
				},
			},
		});
		const newState = clearNotifications(state);
		expect(newState).not.toBe(state);
		const notifications = newState.cmf.components.getIn(['Container(Notification)', 'Notification', 'notifications']);
		expect(notifications.size).toBe(0);
	});

	it('should change the state if no notification', () => {
		const state = store.state();
		state.cmf.components = fromJS({
			'Container(Notification)': {
				Notification: {
					notifications: [],
				},
			},
		});
		const newState = pushNotification(state);
		expect(newState).toBe(state);
	});
});
