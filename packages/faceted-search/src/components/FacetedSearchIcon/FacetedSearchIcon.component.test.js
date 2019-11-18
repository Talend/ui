import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacetedSearchIcon } from './FacetedSearchIcon.component';
import getDefaultT from '../../translate';

const t = getDefaultT();

describe('FacetedSearchIcon', () => {
	const onClick = jest.fn();
	it('should render by default', () => {
		// given nothing
		// when
		const wrapper = mount(<FacetedSearchIcon onClick={onClick} t={t} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with button active when active props true', () => {
		// given nothing
		// when
		const wrapper = mount(<FacetedSearchIcon onClick={onClick} t={t} active />);
		// then
		expect(wrapper.find('button[aria-label="Show faceted search"]').prop('className')).toEqual(
			'faceted-search-icon theme-faceted-search-icon tc-icon-toggle theme-tc-icon-toggle theme-active active btn btn-link',
		);
	});
	it('should call onClick when trigger click', () => {
		// given nothing
		// when
		const wrapper = mount(<FacetedSearchIcon onClick={onClick} t={t} />);
		wrapper.find('button[aria-label="Show faceted search"]').simulate('click');
		// then
		expect(onClick).toHaveBeenCalled();
		expect(onClick.mock.calls.length).toBe(1);
	});
});
