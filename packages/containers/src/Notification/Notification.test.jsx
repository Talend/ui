/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/display-name */
import { render } from '@testing-library/react';
import { mock } from '@talend/react-cmf';
import { List, Map, fromJS } from 'immutable';
// eslint-disable-next-line @talend/import-depth
import { prepareCMF } from '@talend/react-cmf/lib/mock/rtl';
import Container from './Notification.container';
import Connected, { mergeProps, deleteNotification } from './Notification.connect';
import pushNotification from './pushNotification';
import clearNotifications from './clearNotifications';

vi.mock('@talend/react-components/lib/Notification', () => ({
	default: props => <div className="tc-notifications" notifications={props.notifications} />,
}));

describe('Container Notification', () => {
	it('should render', async () => {
		const { container } = render(await prepareCMF(<Container />));
		expect(container.firstChild).toMatchSnapshot();
	});
});

describe('Connected Notification', () => {
	it('should connect Notification', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('mergeProps should merge the props', () => {
		const message = { message: 'hello world' };
		const stateProps = {
			state: fromJS({ notifications: [message] }),
		};
		const dispatchProps = {
			setState: jest.fn(),
		};
		const ownProps = { foo: 'bar' };
		const props = mergeProps(stateProps, dispatchProps, ownProps);
		expect(props.foo).toBe('bar');
		expect(props.state.get('notifications').size).toBe(1);
		expect(typeof props.setState).toBe('function');
		expect(typeof props.deleteNotification).toBe('function');
		props.deleteNotification(message);
		expect(dispatchProps.setState).toHaveBeenCalledTimes(1);
	});

	it('deleteNotification should delete notification', () => {
		const message = fromJS({ message: 'hello world' });
		const stateProps = {
			state: fromJS({ notifications: [message] }),
		};
		expect(deleteNotification(message)(stateProps).toJS()).toEqual({
			notifications: [],
		});
	});

	it('deleteNotification should delete a notification copied for rendering', () => {
		const notification = { id: 'notification-1', message: 'hello world' };
		const otherNotification = { id: 'notification-2', message: 'another notification' };
		const stateProps = {
			state: new Map({ notifications: new List([notification, otherNotification]) }),
		};
		const renderedNotification = stateProps.state.toJS().notifications[0];
		expect(renderedNotification).not.toBe(notification);
		expect(deleteNotification(renderedNotification)(stateProps).toJS()).toEqual({
			notifications: [otherNotification],
		});
	});

	it('deleteNotification should delete an immutable notification by id', () => {
		const stateProps = {
			state: fromJS({ notifications: [{ id: 'notification-1', message: 'hello world' }] }),
		};
		const renderedNotification = stateProps.state.toJS().notifications[0];
		expect(deleteNotification(renderedNotification)(stateProps).toJS()).toEqual({
			notifications: [],
		});
	});

	it('deleteNotification should preserve notifications when the id does not exist', () => {
		const stateProps = {
			state: fromJS({ notifications: [{ id: 'notification-1', message: 'hello world' }] }),
		};
		expect(deleteNotification({ id: 'notification-2' })(stateProps)).toBe(stateProps.state);
	});

	it('deleteNotification should do nothing if the notification does not exist', () => {
		const ok = fromJS({ message: 'ahah' });
		const ko = fromJS({ message: 'hello world' });
		const stateProps = {
			state: fromJS({ notifications: [ok] }),
		};
		expect(deleteNotification(ko)(stateProps)).toEqual(stateProps.state);
	});
});

describe('Notification.pushNotification', () => {
	it('should add a Notification in the state', () => {
		const state = mock.store.state();
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
		const notifications = newState.cmf.components.getIn([
			'Container(Notification)',
			'Notification',
			'notifications',
		]);
		expect(notifications.size).toBe(1);
		expect(notifications.get(0).message).toBe('hello world');
	});

	it('should add a Notification in the state even if the state slot is not yet available', () => {
		const state = mock.store.state();
		state.cmf.components = new Map();
		const notification = { message: 'hello world' };
		const newState = pushNotification(state, notification);
		const notifications = newState.cmf.components.getIn([
			'Container(Notification)',
			'Notification',
			'notifications',
		]);
		expect(notifications.size).toBe(1);
		expect(notifications.get(0).message).toBe('hello world');
	});

	it('should delete all Notification in the state', () => {
		const state = mock.store.state();
		state.cmf.components = fromJS({
			'Container(Notification)': {
				Notification: {
					notifications: [{ message: 'hello world' }, { message: 'hello world2' }],
				},
			},
		});
		const newState = clearNotifications(state);
		expect(newState).not.toBe(state);
		const notifications = newState.cmf.components.getIn([
			'Container(Notification)',
			'Notification',
			'notifications',
		]);
		expect(notifications.size).toBe(0);
	});

	it('should not change the state if no notification', () => {
		const state = mock.store.state();
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

	it('should not change the state if notification state is not yet availbale', () => {
		const state = mock.store.state();
		state.cmf.components = fromJS({});
		const newState = pushNotification(state);
		expect(newState).toBe(state);
	});
});
