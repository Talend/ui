import React from 'react';
import { mount, shallow } from 'enzyme';
import { Action } from '../Actions';
import NotificationsContainer, {
	Notification,
	TimerBar,
	CloseButton,
	Message,
	MessageAction,
} from './Notification.component';

jest.useFakeTimers();

describe('CloseButton', () => {
	it('should call leaveFn props when the user click', () => {
		const notification = { foo: 'bar' };
		const leaveFn = jest.fn();
		const wrapper = mount(<CloseButton notification={notification} leaveFn={leaveFn} />);
		wrapper.find('button').simulate('click');
		expect(leaveFn).toHaveBeenCalledWith(notification);
	});
});

describe('MessageAction', () => {
	it('should render an Action if action props', () => {
		const action = { foo: 'bar' };
		const wrapper = shallow(<MessageAction action={action} />);
		expect(wrapper.type()).toBe(Action);
	});

	it('should render nothing if no action', () => {
		const wrapper = shallow(<MessageAction />);
		expect(wrapper.type()).toBe(null);
	});
});

describe('Message', () => {
	it('should render an article with one paragraph if notification is not an array', () => {
		const notification = { message: 'bar' };
		const wrapper = shallow(<Message notification={notification} />);
		expect(wrapper.type()).toBe('article');
		expect(wrapper.find('p').length).toBe(1);
	});
	it('should render an article if notification is not an array', () => {
		const notification = { message: ['foo', 'bar'] };
		const wrapper = shallow(<Message notification={notification} />);
		expect(wrapper.type()).toBe('article');
		expect(wrapper.find('p').length).toBe(2);
	});
	it('should render a MessageAction if notification contain an action attribute', () => {
		const notification = { message: 'bar', action: { label: 'my bar' } };
		const wrapper = shallow(<Message notification={notification} />);
		const action = wrapper.find(MessageAction);
		expect(action.first().props().action.label).toBe('my bar');
	});
});

describe('TimerBar', () => {
	it('should render null if type === error', () => {
		const wrapper = shallow(<TimerBar type="error" />);
		expect(wrapper.type()).toBe(null);
	});
	it('should render null if type === error', () => {
		const wrapper = shallow(<TimerBar type="whatever" />);
		expect(wrapper.type()).toBe('div');
	});
});

describe('TimerBar', () => {
	it('should render null if type === error', () => {
		const wrapper = shallow(<TimerBar type="error" />);
		expect(wrapper.type()).toBe(null);
	});
	it('should render null if type === error', () => {
		const wrapper = shallow(<TimerBar type="whatever" />);
		expect(wrapper.type()).toBe('div');
	});
});

describe('Notification', () => {
	const event = {};
	let wrapper;
	let props;
	beforeEach(() => {
		props = {
			notification: { message: 'foo', type: 'error' },
			onClick: jest.fn(),
			onMouseEnter: jest.fn(),
			onMouseOut: jest.fn(),
		};
		wrapper = shallow(<Notification {...props} />);
	});

	it('should render error', () => {
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should call onMouseEnter with the notification when focus', () => {
		wrapper.simulate('focus', event);
		expect(props.onMouseEnter).toHaveBeenCalledWith(event, props.notification);
	});
	it('should call onMouseEnter with the notification when mouseenter', () => {
		wrapper.simulate('mouseEnter', event);
		expect(props.onMouseEnter).toHaveBeenCalledWith(event, props.notification);
	});
	it('should call onMouseOut with the notification when mouseleave', () => {
		wrapper.simulate('mouseLeave', event);
		expect(props.onMouseOut).toHaveBeenCalledWith(event, props.notification);
	});
	it('should call onClick with the notification when mouseleave', () => {
		wrapper.simulate('click', event);
		expect(props.onClick).toHaveBeenCalledWith(event, props.notification);
	});
});

describe('NotificationContainer', () => {
	describe('Timer Registry Utility', () => {
		it('register, pause, resume, cancel, isRegistered', () => {
			const notification = {
				id: 'test-1',
			};
			const mockTimer = {
				pause: jest.fn(),
				resume: jest.fn(),
				cancel: jest.fn(),
			};
			const instance = new NotificationsContainer({ notifications: [] });
			instance.registry.register(notification, mockTimer);
			expect(instance.registry.isRegistered(notification)).toEqual(true);
			instance.registry.pause(notification);
			expect(mockTimer.pause).toHaveBeenCalled();
			instance.registry.resume(notification);
			expect(mockTimer.resume).toHaveBeenCalled();
			expect(instance.registry.timerRegistry).toHaveProperty(notification.id);
			instance.registry.cancel(notification);
			expect(mockTimer.cancel).toHaveBeenCalled();
			expect(instance.registry.timerRegistry).toEqual({});
		});
	});

	describe('Event Handler', () => {
		let mockEvent;
		let mockStopPropagation;
		let mockGetAttribute;
		let mockSetAttribute;
		let mockLeaveFn;
		const mockNotification = {
			type: 'info',
		};

		beforeEach(() => {
			mockStopPropagation = jest.fn();
			mockGetAttribute = jest.fn(() => '');
			mockSetAttribute = jest.fn();
			mockLeaveFn = jest.fn();
			mockEvent = {
				currentTarget: {
					setAttribute: mockSetAttribute,
					getAttribute: mockGetAttribute,
				},
				stopPropagation: mockStopPropagation,
			};
		});

		it('onMouseEnter', () => {
			const instance = new NotificationsContainer({ notifications: [] });
			instance.registry.pause = jest.fn();
			const event = {
				currentTarget: {
					setAttribute: jest.fn(),
				},
			};
			instance.onMouseEnter(event, mockNotification);
			expect(instance.registry.pause).toHaveBeenCalledWith(mockNotification);
		});

		it('onMouseOut', () => {
			const props = {
				leaveFn: jest.fn(),
				autoLeaveTimeout: 4000,
				notifications: [],
			};
			const instance = new NotificationsContainer(props);
			instance.registry.register = jest.fn();
			instance.registry.resume = jest.fn();
			instance.onMouseOut(mockEvent, mockNotification);
			expect(mockEvent.currentTarget.getAttribute).toHaveBeenCalledWith('pin');
			expect(instance.registry.resume).toHaveBeenCalledWith(mockNotification);
		});

		it('onClick', () => {
			const props = { notifications: [], leaveFn: jest.fn() };
			const instance = new NotificationsContainer(props);
			instance.onClick(mockEvent, mockNotification);
			expect(mockGetAttribute).toHaveBeenCalledWith('pin');
			expect(mockSetAttribute).toHaveBeenCalledWith('pin', 'true');
			mockEvent.currentTarget.getAttribute = jest.fn(() => 'true');
			instance.onClick(mockEvent, mockNotification);
			expect(mockSetAttribute.mock.calls[1]).toEqual(['pin', 'false']);
			expect(props.leaveFn).toHaveBeenCalledWith(mockNotification);
		});

		it('onClose', () => {
			const props = {
				leaveFn: mockLeaveFn,
				notifications: [],
			};
			const instance = new NotificationsContainer(props);
			instance.registry.cancel = jest.fn();
			instance.onClose(mockEvent, mockNotification);
			expect(mockStopPropagation).toHaveBeenCalled();
			expect(instance.registry.cancel).toHaveBeenCalledWith(mockNotification);
			expect(mockLeaveFn).toHaveBeenCalled();
		});
	});

	describe('Autoleave', () => {
		let notifications;
		const mockLeaveFn = jest.fn();

		beforeEach(() => {
			notifications = [
				{
					id: 0,
					message: 'This is a feedback of your operation1, This is a feedback of your operation1',
					action: {
						label: 'UNDO',
						icon: 'talend-undo',
						onClick: () => {},
					},
				},
				{
					id: 1,
					type: 'info',
					message: 'This is a feedback of your operation1, This is a feedback of your operation1',
				},
				{
					id: 2,
					type: 'warning',
					message: 'This is a feedback of your operation2, This is a feedback of your operation2',
				},
				{
					id: 3,
					type: 'error',
					message: 'This is a feedback of your operation3, This is a feedback of your operation3',
				},
			];
		});

		it(
			'should register autoLeave only for notification of type info or warning ' +
				'should trigger leaveFn after timeout',
			() => {
				const props = {
					notifications,
					leaveFn: mockLeaveFn,
				};
				const instance = new NotificationsContainer(props);
				expect(instance).toBeDefined();
				expect(mockLeaveFn).not.toHaveBeenCalled();
				jest.runAllTimers();
				expect(mockLeaveFn).toHaveBeenCalledTimes(3);
			},
		);
	});
});
