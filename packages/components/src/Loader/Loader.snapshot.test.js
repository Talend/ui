import React from 'react';
import renderer from 'react-test-renderer';

import Loader from './Loader.component';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

jest.mock('react-dom');

describe('Loader', () => {
	Object.keys(SIZE).forEach(size => {
		it(`should render a ${size} loader`, () => {
			const wrapper = renderer.create(<Loader size={SIZE[size]} />).toJSON();

			expect(wrapper).toMatchSnapshot();
		});
	});

	it('should render a default loader if size is not specified', () => {
		const wrapper = renderer.create(<Loader />).toJSON();

		expect(wrapper).toMatchSnapshot();
	});
});
