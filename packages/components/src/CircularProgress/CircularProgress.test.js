import React from 'react';
import renderer from 'react-test-renderer';

import CircularProgress from './CircularProgress.component';

describe('CircularProgress', () => {
	it('should render by default at default size', () => {
		const wrapper = renderer.create(<CircularProgress />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render at small size if set', () => {
		const wrapper = renderer.create(<CircularProgress size="small" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render at large size if set', () => {
		const wrapper = renderer.create(<CircularProgress size="large" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render as light if set', () => {
		const wrapper = renderer.create(<CircularProgress light />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with percent if set', () => {
		const wrapper = renderer.create(<CircularProgress percent={30} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
