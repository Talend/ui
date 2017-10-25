import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Progress from './Progress.component';

faker.seed(42);
describe('Progress', () => {
	it('should render hidden progress at 0%', () => {
		// given
		const props = {
			id: 'my-progress',
			percent: 0,
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render progress with given percentage', () => {
		// given
		const props = {
			id: 'my-progress',
			percent: faker.random.number({ max: 100 }),
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should normalize percent to 0 when prop is < 0', () => {
		// given
		const props = {
			id: 'my-progress',
			percent: -20,
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should normalize percent to 100 when prop is > 100', () => {
		// given
		const props = {
			id: 'my-progress',
			percent: 200,
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render progress with tooltip', () => {
		// given
		const props = {
			id: 'my-progress',
			percent: faker.random.number({ max: 100 }),
			tooltip: faker.random.words(),
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render an infinite progress with tooltip', () => {
		// given
		const props = {
			id: 'my-progress',
			infinite: true,
			tooltip: faker.random.words(),
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a contained progress', () => {
		// given
		const props = {
			id: 'my-progress',
			contained: true,
			percent: faker.random.number({ max: 100 }),
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
