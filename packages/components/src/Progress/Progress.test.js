import React from 'react';
import renderer from 'react-test-renderer';

import Progress from './Progress.component';

describe('Progress', () => {
	it('should render hidden progress at 0%', () => {
		// given
		const props = {
			id: 'my-progress',
			percent: 0,
			tooltip: 'loading',
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
			percent: 60,
			tooltip: 'loading',
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
			tooltip: 'loading',
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
			tooltip: 'loading',
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render an infinite progress', () => {
		// given
		const props = {
			id: 'my-progress',
			infinite: true,
			tooltip: 'Hey dude !',
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
			percent: 60,
			tooltip: 'loading',
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
