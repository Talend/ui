import React from 'react';
import { mount } from 'enzyme';
import Notification, { timerRegistry, Registry, onMouseEnter, onMouseOut, onClick, onManuallyClose }
	from './Notification.component';

jest.useFakeTimers();

describe('Notification', () => {
	describe('Timer Registry Utility', () => {
		it('register, cancel, isRegistered', () => {
			const notification = {
				id: 'test-1',
			};
			const mockTimer = 1;

			Registry.register(notification, mockTimer);
			expect(timerRegistry[notification.id]).toEqual(mockTimer);
			expect(Registry.isRegistered(notification)).toEqual(true);
			Registry.cancel(notification);
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
			Registry.cancel = jest.fn();
			Registry.register = jest.fn();
		});

		it('onMouseEnter', () => {
			onMouseEnter(mockNotification);
			expect(Registry.cancel).toHaveBeenCalledWith(mockNotification);
		});

		it('onMouseOut', () => {
			onMouseOut(mockEvent, mockNotification, mockLeaveFn, 4000);
			expect(mockEvent.currentTarget.getAttribute).toHaveBeenCalledWith('pin');
			expect(setTimeout).toHaveBeenCalled();
			expect(Registry.register).toHaveBeenCalled();
		});

		it('onClick', () => {
			onClick(mockEvent, mockNotification);
			expect(mockGetAttribute).toHaveBeenCalledWith('pin');
			expect(mockSetAttribute).toHaveBeenCalledWith('pin', 'true');
			mockEvent.currentTarget.getAttribute = jest.fn(() => 'true');
			onClick(mockEvent, mockNotification);
			expect(mockSetAttribute.mock.calls[1]).toEqual(['pin', 'false']);
		});

		it('onManuallyClose', () => {
			Registry.cancel = jest.fn();
			onManuallyClose(mockEvent, mockNotification, mockLeaveFn);
			expect(mockStopPropagation).toHaveBeenCalled();
			expect(Registry.cancel).toHaveBeenCalledWith(mockNotification);
			expect(mockLeaveFn).toHaveBeenCalled();
		});
	});

	describe('Autoleave', () => {
		let notifications;
		const mockLeaveFn = jest.fn();

		beforeEach(() => {
			Registry.register = jest.fn();
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
			mount(<Notification notifications={notifications} leaveFn={mockLeaveFn} />);
		});

		it('should register autoLeave only for notification of type info or warning ' +
			'should trigger leaveFn after timeout', () => {
			expect(Registry.register.mock.calls.length).toEqual(3);
			expect(mockLeaveFn).not.toHaveBeenCalled();
			jest.runAllTimers();
			expect(mockLeaveFn.mock.calls.length).toEqual(3);
		});
	});
});
