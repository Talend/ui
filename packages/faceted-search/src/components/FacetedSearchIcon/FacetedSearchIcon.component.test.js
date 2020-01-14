import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacetedSearchIcon } from './FacetedSearchIcon.component';
import getDefaultT from '../../translate';

const t = getDefaultT();

describe('FacetedSearchIcon', () => {
	it('should render by default', () => {
		// given
		const props = {
			onClick: jest.fn(),
			t,
		};
		// when
		const wrapper = mount(<FacetedSearchIcon {...props} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with button active when active props true', () => {
		// given
		const props = {
			active: true,
			onClick: jest.fn(),
			t,
		};
		// when
		const wrapper = mount(<FacetedSearchIcon {...props} />);
		// then
		expect(wrapper.find('button[aria-label="Show faceted search"]').prop('className')).toEqual(
			'faceted-search-icon theme-faceted-search-icon tc-icon-toggle theme-tc-icon-toggle theme-active active btn btn-link',
		);
	});
	it('should call onClick when trigger click', () => {
		// given
		const onClick = jest.fn();
		const props = {
			active: true,
			onClick,
			t,
		};
		// when
		const wrapper = mount(<FacetedSearchIcon {...props} />);
		wrapper.find('button[aria-label="Show faceted search"]').simulate('click');
		// then
		expect(onClick).toHaveBeenCalled();
		expect(onClick.mock.calls.length).toBe(1);
	});
	it('should render the button in loading mode', () => {
		// given
		const props = {
			loading: true,
			onClick: jest.fn(),
			t,
		};
		// when
		const wrapper = mount(<FacetedSearchIcon {...props} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
});
