import React from 'react';
import renderer from 'react-test-renderer';

import CircularProgress from './CircularProgress.component';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

describe('CircularProgress', () => {
	it('should render by default at default size', () => {
		const wrapper = renderer.create(<CircularProgress />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render at small size if set', () => {
		const wrapper = renderer.create(<CircularProgress size={SIZE.small} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render at large size if set', () => {
		const wrapper = renderer.create(<CircularProgress size={SIZE.large} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

  it('should render at xlarge size if set', () => {
    const wrapper = renderer.create(<CircularProgress size={SIZE.xlarge} />).toJSON();
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
