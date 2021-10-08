import React from 'react';

import { List, Map } from 'immutable';
import { Notification } from '../src';

const initialState = new Map({
	notifications: new List([
		{
			id: 'story-1',
			message: 'This is a feedback of your operation1, This is a feedback of your operation1',
		},
		{
			id: 'story-2',
			type: 'error',
			message: [
				'This is a feedback of your operation2',
				'This is a feedback of your operation1, This is a feedback of your operation1',
			],
		},
		{
			id: 'story-3',
			type: 'warning',
			message: ['This is a feedback of your operation3', 'details'],
		},
	]),
});

export default function ExampleNotification() {
	return (
		<div>
			<Notification initialState={initialState} />
		</div>
	);
}
