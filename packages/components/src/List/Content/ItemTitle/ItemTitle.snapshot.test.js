import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import ItemTitle from './ItemTitle.component';

faker.seed(42);
describe('ItemTitle', () => {
	it('should render text title', () => {
		// given
		const props = {
			id: faker.random.word(),
			value: faker.random.words(),
		};

		// when
		const wrapper = renderer.create(<ItemTitle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render button title', () => {
		// given
		const props = {
			id: faker.random.word(),
			value: faker.random.words(),
			display: 'button',
			onClick: jest.fn(),
		};

		// when
		const wrapper = renderer.create(<ItemTitle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render input title', () => {
		// given
		const props = {
			id: faker.random.word(),
			value: faker.random.word(),
			display: 'input',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			onCancel: jest.fn(),
		};

		// when
		const wrapper = renderer.create(<ItemTitle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
