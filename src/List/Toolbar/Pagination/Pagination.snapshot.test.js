import React from 'react';
import renderer from 'react-test-renderer';

import Pagination from './Pagination.component';

jest.mock('react-dom');

describe('Pagination', () => {
	it('should render', () => {
		const props = {
			itemsLength: 17,
			onChangePagination: jest.fn(),
		};
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
