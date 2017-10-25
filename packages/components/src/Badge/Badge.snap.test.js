import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Badge from './Badge.component';

faker.seed(42);
describe('BadgeSpec', () => {
	it('should render Badge', () => {
		// given
		const props = {
			label: faker.random.word(),
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render Badge with delete icon', () => {
		// given
		const props = {
			label: faker.random.word(),
			onDelete: () => { },
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render selected Badge with delete icon', () => {
		// given
		const props = {
			label: faker.random.word(),
			selected: true,
			onDelete: () => { },
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render disabled Badge with delete icon', () => {
		// given
		const props = {
			label: faker.random.word(),
			disabled: true,
			onDelete: () => { },
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render Badge with category and delete icon', () => {
		// given
		const props = {
			label: faker.random.word(),
			category: faker.random.word(),
			onDelete: () => { },
		};
		// when
		const wrapper = renderer.create(
			<Badge {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
});
