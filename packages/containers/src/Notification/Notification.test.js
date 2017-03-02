import React from 'react';
import renderer from 'react-test-renderer';
import { store, Provider } from 'react-cmf/lib/mock';
import { fromJS, Map } from 'immutable';
import Container, { DEFAULT_STATE } from './Notification.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './Notification.connect';
import pushNotification from './pushNotification';

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

describe('Notification.pushNotification', () => {
	it('should add a Notification in the state', () => {
		const state = store.state();
		state.cmf.components = fromJS({
			Notification: {
				Notification: {
					notifications: [],
				},
			},
		});
		const notification = { message: 'hello world' };
		const newState = pushNotification(state, notification);
		expect(newState).not.toBe(state);
		const notifications = newState.cmf.components.getIn(['Notification', 'Notification', 'notifications']);
		expect(notifications.size).toBe(1);
		expect(notifications.get(0).message).toBe('hello world');
	});
});
