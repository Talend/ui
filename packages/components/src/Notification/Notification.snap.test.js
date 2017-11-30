import React from 'react';
import renderer from 'react-test-renderer';

import NotificationContainer from './Notification.component';

describe('Notification', () => {
	it('should render', () => {
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
					'This is a feedback of your operation1, This is a feedback of your operation1',
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
		const wrapper = renderer
			.create(<NotificationContainer notifications={notifications} leaveFn={() => {}} />)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
