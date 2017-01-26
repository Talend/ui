import React from 'react';
import renderer from 'react-test-renderer';

import Progress from './Progress.component';

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
			percent: 60,
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
			percent: 60,
			tooltip: 'Hey dude ! Progress: 60% !',
		};

		// when
		const wrapper = renderer.create(<Progress {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
