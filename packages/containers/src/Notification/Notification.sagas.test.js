import { runSaga } from 'redux-saga';
import { onPushNotification } from './Notification.sagas';

describe('Notification sagas', () => {
	describe('onPushNotification', () => {
		const onPushNotificationAction = {
			notification: {
				message: 'WHATEVER_MESSAGE',
			},
		};

		it('should dispatch the component state updated with the new notification', async () => {
			const dispatched = [];

			await runSaga(
				{
					dispatch: a => dispatched.push(a),
					getState: () => ({
						cmf: {
							components: {
								'Container(Notification)': {
									Notification: {
										notifications: [],
									},
								},
							},
						},
					}),
				},
				onPushNotification,
				onPushNotificationAction,
			).done;

			const actions = dispatched;

			expect(actions[0]).toEqual({
				type: 'Container(Notification).setState',
				cmf: expect.objectContaining({
					componentState: expect.objectContaining({
						componentName: 'Container(Notification)',
						componentState: expect.objectContaining({
							notifications: [
								expect.objectContaining({
									id: expect.anything(),
									message: 'WHATEVER_MESSAGE',
								}),
							],
						}),
						key: 'Notification',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					}),
				}),
			});
		});
	});
});
