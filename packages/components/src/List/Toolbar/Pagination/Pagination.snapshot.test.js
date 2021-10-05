import React from 'react';
import renderer from 'react-test-renderer';

import Pagination from './Pagination.component';

jest.mock('react-dom');

describe('Pagination', () => {
	it('should render', () => {
		// given
		const props = {
			startIndex: 6,
			totalResults: 17,
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
			startIndex: 6,
			totalResults: 17,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should not render navigation when show all items', () => {
		// given
		const props = {
			totalResults: 17,
			itemsPerPage: -1,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render menu item with "All" title when size is -1', () => {
		// given
		const props = {
			itemsPerPage: -1,
			itemsPerPageOptions: [5, 10, 20, -1],
			totalResults: 17,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should disable first and previous buttons for first page', () => {
		// given
		const props = {
			startIndex: 1,
			totalResults: 6,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should disable next and last buttons for last page', () => {
		// given
		const props = {
			startIndex: 6,
			totalResults: 10,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should not show navigation when there is only one page', () => {
		// given
		const props = {
			startIndex: 1,
			totalResults: 5,
			onChange: jest.fn(),
		};
		// when
		const wrapper = renderer.create(
			<Pagination {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should not show navigation when there is no items', () => {
		// given
		const props = {
			startItems: 1,
			totalResults: 0,
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
