/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import toJsonWithoutI18n from '../../../../test/props-without-i18n';
import getDefaultT from '../../../translate';
import { ListContext } from '../context';

import SortBy from './SortBy.component';

describe('SortBy', () => {
	const defaultProps = {
		options: [{ key: 'firstName', label: 'First Name' }, { key: 'lastName', label: 'Last Name' }],
	};

	const defaultContext = {
		sortParams: {},
		setSortParams: jest.fn(),
		t: getDefaultT(),
	};

	it('should render sort by component', () => {
		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<SortBy id="mySortBy" {...defaultProps} />
			</ListContext.Provider>,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render sort by component with sorting parameter from context', () => {
		// given
		const contextValue = { ...defaultContext, sortParams: { sortBy: 'firstName' } };

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<SortBy id="mySortBy" {...defaultProps} />
			</ListContext.Provider>,
		);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should render sort by component with sorting parameter from props', () => {
		// given
		const props = { ...defaultProps, selected: 'lastName', isDescending: true };

		// when
		const wrapper = mount(
			<ListContext.Provider value={defaultContext}>
				<SortBy id="mySortBy" {...props} />
			</ListContext.Provider>,
		);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should handle sort field and direction changes (uncontrolled mode)', () => {
		// given
		const context = {
			...defaultContext,
			sortParams: {},
			setSortParams: jest.fn(),
		};

		const props = {
			...defaultProps,
			id: 'mySortBy',
			selected: 'lastName',
			isDescending: true,
		};

		let wrapper;
		// when
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={context}>
					<SortBy {...props} />
				</ListContext.Provider>,
			);

			// wrapper.find(`NavDropdown#${props.id}`).at(0).prop('onSelect')('firstName');
			wrapper.find(`NavItem#${props.id}-order`).at(0).prop('onClick')();
		});

		// then
		act(() => {
			wrapper.find(`NavDropdown#${props.id}`).at(0).prop('onSelect')('firstName');
		});

		expect(context.setSortParams).toHaveBeenCalledWith({ sortBy: 'firstName' });

		act(() => {
			wrapper.find(`NavItem#${props.id}-order`).at(0).prop('onClick')();
		});

		expect(context.setSortParams).toHaveBeenCalledWith({ isDescending: false });
	});

	it('should call the change callbacks when they are provided (controlled mode)', () => {
		// given
		const onChange = jest.fn();
		const onOrderChange = jest.fn();
		const props = {
			...defaultProps,
			onChange,
			onOrderChange,
			id: 'mySortBy',
			selected: 'lastName',
			isDescending: true,
		};

		let wrapper;
		// when
		act(() => {
			wrapper = mount(
				<ListContext.Provider value={defaultContext}>
					<SortBy {...props} />
				</ListContext.Provider>,
			);

			wrapper.find(`NavDropdown#${props.id}`).at(0).prop('onSelect')();
			wrapper.find(`NavItem#${props.id}-order`).at(0).prop('onClick')();
		});

		// then
		expect(onChange).toHaveBeenCalled();
		expect(onOrderChange).toHaveBeenCalled();
	});
});
