import React from 'react';
import { mount } from 'enzyme';

import Pagination from './Pagination.component';

const props = {
	id: 'pagination',
	startIndex: 11,
	totalResults: 25,
	itemsPerPage: 5,
	onChange: jest.fn(),
};

describe('Pagination', () => {
	it('should navigate to first page', () => {
		// given
		const instance = mount(<Pagination {...props} />);
		// when
		instance.find('a#pagination-nav-to-first').simulate('click');
		// then
		expect(props.onChange).toBeCalledWith(1, 5);
	});

	it('should navigate to previous page', () => {
		// given
		const instance = mount(<Pagination {...props} />);
		// when
		instance.find('a#pagination-nav-to-prev').simulate('click');
		// then
		expect(props.onChange).toBeCalledWith(6, 5);
	});

	it('should navigate to next page', () => {
		// given
		const instance = mount(<Pagination {...props} />);
		// when
		instance.find('a#pagination-nav-to-next').simulate('click');
		// then
		expect(props.onChange).toBeCalledWith(16, 5);
	});

	it('should navigate to last page', () => {
		// given
		const instance = mount(<Pagination {...props} />);
		// when
		instance.find('a#pagination-nav-to-last').simulate('click');
		// then
		expect(props.onChange).toBeCalledWith(21, 5);
	});
});
