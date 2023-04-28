import { List, Map } from 'immutable';
import Notification from '.';

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

export default {
	title: 'Notification',
};

export const Default = () => <Notification initialState={initialState} />;
