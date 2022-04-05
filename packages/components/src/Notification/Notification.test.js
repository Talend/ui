import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Notification from './Notification.component';

describe('Notification', () => {
	afterEach(() => {
		jest.useRealTimers();
	});

	it('should render', () => {
		// given
		const notifications = [
			{
				id: 'story-1',
				message: 'This is a feedback of your operation1, This is a feedback of your operation1',
				action: {
					label: 'Haha',
					icon: 'talend-undo',
					onClick: () => {},
				},
			},
			{
				id: 'story-2',
				type: 'error',
				message: [
					'This is a feedback of your operation2',
					'This is a feedback of your operationZ, This is a feedback of your operationZ',
				],
				action: {
					label: 'undo',
					icon: 'talend-undo',
					onClick: () => {},
				},
			},
			{
				id: 'story-3',
				type: 'warning',
				message: ['This is a feedback of your operation3', 'details'],
			},
			{
				id: 'story-4',
				type: 'warning',
				message: 'This is a feedback of your operation4',
			},
		];

		// when
		render(<Notification notifications={notifications} leaveFn={() => {}} />);

		// then
		expect(screen.getAllByRole('status').length).toBe(3);
		expect(screen.getAllByRole('alert').length).toBe(1);
		notifications
			.map(({ message }) => message)
			.flat()
			.forEach(message => {
				expect(screen.getByText(message)).toBeInTheDocument();
			});
	});

	it('should render an Action in notification', () => {
		// given
		const action = { id: 'lol', onClick: jest.fn(), 'data-testid': 'lol' };
		const notification = { id: 'id', message: 'foo', action };

		// when
		render(<Notification notifications={[notification]} leaveFn={jest.fn()} />);

		// then
		expect(screen.getByTestId('lol')).toBeInTheDocument();
	});

	it('should render a simple message', () => {
		// given
		const notification = { id: 'id', message: 'bar' };

		// when
		render(<Notification notifications={[notification]} leaveFn={jest.fn()} />);

		// then
		expect(screen.getByText('bar')).toBeInTheDocument();
	});

	it('should render an an array of messages', () => {
		// given
		const notification = { id: 'id', message: ['foo', 'bar'] };

		// when
		render(<Notification notifications={[notification]} leaveFn={jest.fn()} />);

		// then
		expect(screen.getByText('foo')).toBeInTheDocument();
		expect(screen.getByText('bar')).toBeInTheDocument();
	});

	it('should render a time bar', () => {
		// given
		const notification = { id: 'id', message: 'foo' };

		// when
		render(<Notification notifications={[notification]} leaveFn={jest.fn()} />);

		// then
		expect(screen.getByTestId('timer')).toBeInTheDocument();
	});

	it('should render not time bar with error notification', () => {
		// given
		const notification = { id: 'id', message: 'foo', type: 'error' };

		// when
		render(<Notification notifications={[notification]} leaveFn={jest.fn()} />);

		// then
		expect(screen.queryByTestId('timer')).not.toBeInTheDocument();
	});

	it('should pin notification when the user click', () => {
		// given
		const leaveFn = jest.fn();
		const notification = { id: 'id', message: 'foo' };
		render(<Notification notifications={[notification]} leaveFn={leaveFn} />);
		const notifDiv = screen.getByRole('status');
		expect(notifDiv).not.toHaveAttribute('pin', 'true');

		// when
		userEvent.click(notifDiv);

		// then
		expect(notifDiv).toHaveAttribute('pin', 'true');
	});

	it('should call leaveFn props when the user click', () => {
		// given
		const leaveFn = jest.fn();
		const notification = { id: 'id', message: 'foo' };
		render(<Notification notifications={[notification]} leaveFn={leaveFn} />);
		expect(leaveFn).not.toHaveBeenCalled();
		const notifDiv = screen.getByRole('status');

		// when
		userEvent.click(notifDiv); // pin
		userEvent.click(notifDiv);

		// then
		expect(leaveFn).toHaveBeenCalledWith(notification);
	});

	it('should call leaveFn props when the user click on close button', () => {
		// given
		const leaveFn = jest.fn();
		const notification = { id: 'id', message: 'foo' };
		render(<Notification notifications={[notification]} leaveFn={leaveFn} />);
		expect(leaveFn).not.toHaveBeenCalled();
		const closeBtn = screen.getByRole('button');

		// when
		userEvent.click(closeBtn);

		// then
		expect(leaveFn).toHaveBeenCalledWith(notification);
	});

	it('should call leaveFn after timeout', () => {
		// given
		jest.useFakeTimers();
		const notification = { id: 'id', message: 'foo' };
		const leaveFn = jest.fn();

		// when
		render(
			<Notification notifications={[notification]} leaveFn={leaveFn} autoLeaveTimeout={2000} />,
		);
		expect(leaveFn).not.toBeCalled();
		jest.advanceTimersByTime(2000);

		// then
		expect(leaveFn).toBeCalled();
	});

	it('should not call leaveFn after timeout on error', () => {
		// given
		jest.useFakeTimers();
		const notification = { id: 'id', message: 'foo', type: 'error' };
		const leaveFn = jest.fn();

		// when
		render(
			<Notification notifications={[notification]} leaveFn={leaveFn} autoLeaveTimeout={2000} />,
		);
		expect(leaveFn).not.toBeCalled();
		jest.advanceTimersByTime(2000);

		// then
		expect(leaveFn).not.toBeCalled();
	});

	it('should pause/resume timer on hover/leave', () => {
		// given
		jest.useFakeTimers();
		const notification = { id: 'id', message: 'foo' };
		const leaveFn = jest.fn();
		render(
			<Notification notifications={[notification]} leaveFn={leaveFn} autoLeaveTimeout={2000} />,
		);

		// when
		fireEvent.mouseEnter(screen.getByText('foo'));
		jest.advanceTimersByTime(2000);

		// then
		expect(leaveFn).not.toBeCalled();

		// when
		fireEvent.mouseOut(screen.getByText('foo'));
		jest.advanceTimersByTime(2000);

		// then
		expect(leaveFn).toBeCalled();
	});
});
