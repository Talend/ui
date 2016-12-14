import React from 'react';
import renderer from 'react-test-renderer';

import Notification from './Notification.component';

describe('Notification', () => {
	it('should render', () => {
		const notifications = [
			{
				id: 0,
				message: 'This is a feedback of your operation0, This is a feedback of your operation0',
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
				action: {
					label: 'UNDO',
					icon: 'talend-undo',
					onClick: () => {},
				},
			},
			{
				id: 2,
				type: 'error',
				message: 'This is a feedback of your operation2, This is a feedback of your operation2',
			},
			{
				id: 3,
				type: 'warning',
				message: 'This is a feedback of your operation3, This is a feedback of your operation3',
				action: {
					label: 'UNDO',
					icon: 'talend-undo',
					onClick: () => {},
				},
			},
		];
		const wrapper = renderer.create(
			<Notification notifications={notifications} leaveFn={() => {}} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
