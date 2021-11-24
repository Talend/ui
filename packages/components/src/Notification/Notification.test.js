import React from 'react';
import { mount } from 'enzyme';
import Notification from './Notification.component';

jest.useFakeTimers();

describe('CloseButton', () => {
	it('should call leaveFn props when the user click', () => {
		const leaveFn = jest.fn();
		const notification = { message: 'foo' };
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={leaveFn} />);
		wrapper.find('button').simulate('click');
		expect(leaveFn).toHaveBeenCalledWith(notification);
	});
});

describe('MessageAction', () => {
	it('should render an Action if action props', () => {
		const action = { id: 'lol', onClick: jest.fn() };
		const notification = { message: 'foo', action };
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={jest.fn()} />);
		wrapper.find('button#lol').simulate('click');
		expect(action.onClick).toHaveBeenCalled();
	});
});

describe('Message', () => {
	it('should render an article with one paragraph if notification is not an array', () => {
		const notification = { message: 'bar' };
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={jest.fn()} />);
		expect(wrapper.find('article').length).toBe(1);
		expect(wrapper.find('p').length).toBe(1);
	});
	it('should render an article if notification is an array', () => {
		const notification = { message: ['foo', 'bar'] };
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={jest.fn()} />);
		expect(wrapper.find('article').length).toBe(1);
		expect(wrapper.find('p').length).toBe(2);
	});
});

describe('TimerBar', () => {
	it('should render not time bar if type === error', () => {
		const notification = { message: 'bar', type: 'error' };
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={jest.fn()} />);
		expect(wrapper.find('div.tc-notification-timer-bar').length).toBe(0);
	});
	it('should render a TimeBar', () => {
		const notification = { message: 'bar', type: 'success' };
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={jest.fn()} />);
		expect(wrapper.find('div.tc-notification-timer-bar').length).toBe(1);
	});
});

describe('Notification', () => {
	it('should render error', () => {
		const notification = {
			message: 'foo',
			type: 'error',
			onClick: jest.fn(),
			onMouseEnter: jest.fn(),
			onMouseOut: jest.fn(),
		};
		const leaveFn = jest.fn();
		const wrapper = mount(<Notification notifications={[notification]} leaveFn={leaveFn} />);
		expect(wrapper.find('div.tc-notification').getElement()).toMatchSnapshot();
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
			const instance = new Notification({ notifications: [] });
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
			const instance = new Notification({ notifications: [] });
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
			const instance = new Notification(props);
			instance.registry.register = jest.fn();
			instance.registry.resume = jest.fn();
			instance.onMouseOut(mockEvent, mockNotification);
			expect(mockEvent.currentTarget.getAttribute).toHaveBeenCalledWith('pin');
			expect(instance.registry.resume).toHaveBeenCalledWith(mockNotification);
		});

		it('onClick', () => {
			const props = { notifications: [], leaveFn: jest.fn() };
			const instance = new Notification(props);
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
			const instance = new Notification(props);
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
				const instance = new Notification(props);
				expect(instance).toBeDefined();
				expect(mockLeaveFn).not.toHaveBeenCalled();
				jest.runAllTimers();
				expect(mockLeaveFn).toHaveBeenCalledTimes(3);
			},
		);
	});
});
