import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Notification from './Notification.component';

faker.seed(42);
describe('Notification', () => {
	it('should render', () => {
		const notifications = [
			{
				id: faker.random.word(),
				message: faker.random.words(15),
				action: {
					label: faker.random.word(),
					icon: 'talend-undo',
					onClick: () => {},
				},
			},
			{
				id: faker.random.word(),
				type: 'error',
				message: [faker.random.words(), faker.random.words(20)],
				action: {
					label: faker.random.word(),
					icon: 'talend-undo',
					onClick: () => {},
				},
			},
			{
				id: faker.random.word(),
				type: 'warning',
				message: [faker.random.words(5), faker.random.word()],
			},
			{
				id: faker.random.word(),
				type: 'warning',
				message: faker.random.words(),
			},
		];
		const wrapper = renderer
			.create(<Notification notifications={notifications} leaveFn={() => {}} />)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
