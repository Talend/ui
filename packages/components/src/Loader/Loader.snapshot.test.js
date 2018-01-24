import React from 'react';
import renderer from 'react-test-renderer';

import Loader from './Loader.component';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

jest.mock('react-dom');

describe('Loader', () => {
	it('should render a loader', () => {
		const wrapper = renderer.create(<Loader />).toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render a small loader', () => {
		const wrapper = renderer.create(<Loader size={SIZE.SMALL} />).toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render a large loader', () => {
		const wrapper = renderer.create(<Loader size={SIZE.LARGE} />).toJSON();

		expect(wrapper).toMatchSnapshot();
	});
});
