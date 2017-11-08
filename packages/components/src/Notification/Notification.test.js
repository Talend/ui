import React from 'react';
import { mount } from 'enzyme';
import NotificationsContainer, {
	Notification,
	TimerBar,
	CloseButton,
	Message,
	MessageAction,
} from './Notification.component';

jest.useFakeTimers();

describe('Notification', () => {
	describe('Timer Registry Utility', () => {
		it('register, cancel, isRegistered', () => {
			const notification = {
				id: 'test-1',
			};
			const mockTimer = 1;
			const instance = new NotificationsContainer({ notifications: [] });
			instance.registry.register(notification, mockTimer);
			expect(instance.timerRegistry[notification.id]).toEqual(mockTimer);
			expect(instance.registry.isRegistered(notification)).toEqual(true);
			instance.registry.cancel(notification);
			expect(clearTimeout).toHaveBeenCalledWith(mockTimer);
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
			// Registry.cancel = jest.fn();
			// Registry.register = jest.fn();
		});

		it('onMouseEnter', () => {
			const instance = new NotificationsContainer({ notifications: [] });
			instance.registry.cancel = jest.fn();
			instance.onMouseEnter({}, mockNotification);
			expect(instance.registry.cancel).toHaveBeenCalledWith(mockNotification);
		});

		it('onMouseOut', () => {
			const props = {
				leaveFn: jest.fn(),
				autoLeaveTimeout: 4000,
				notifications: [],
			};
			const instance = new NotificationsContainer(props);
			instance.registry.register = jest.fn();
			instance.onMouseOut(mockEvent, mockNotification);
			expect(mockEvent.currentTarget.getAttribute).toHaveBeenCalledWith('pin');
			expect(props.leaveFn).toHaveBeenCalledWith(mockNotification);
		});

		it('onClick', () => {
			const instance = new NotificationsContainer({ notifications: [] });
			instance.onClick(mockEvent, mockNotification);
			expect(mockGetAttribute).toHaveBeenCalledWith('pin');
			expect(mockSetAttribute).toHaveBeenCalledWith('pin', 'true');
			mockEvent.currentTarget.getAttribute = jest.fn(() => 'true');
			instance.onClick(mockEvent, mockNotification);
			expect(mockSetAttribute.mock.calls[1]).toEqual(['pin', 'false']);
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
			// Registry.register = jest.fn();
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

		it('should register autoLeave only for notification of type info or warning ' +
			'should trigger leaveFn after timeout', () => {
			const props = {
				notifications,
				leaveFn: mockLeaveFn,
			};
			const instance = new NotificationsContainer(props);
			expect(mockLeaveFn).not.toHaveBeenCalled();
			expect(Object.keys(instance.timerRegistry).length).toBe(3);
			jest.runAllTimers();
			expect(mockLeaveFn.mock.calls.length).toEqual(3);
		});
	});
});
