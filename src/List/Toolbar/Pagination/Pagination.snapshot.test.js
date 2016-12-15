import React from 'react';
import renderer from 'react-test-renderer';

import Pagination from './Pagination.component';

jest.mock('react-dom');

describe('Pagination', () => {
	it('should render', () => {
		// given
		const props = {
			itemsLength: 17,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// given
		const props = {
			id: 'toolbar-pagination',
			itemsLength: 17,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
});
