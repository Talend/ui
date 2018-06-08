import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import MandatoryFieldFilterComponent from './MandatoryFieldFilterComponent';
import MandatoryFieldFilter from './MandatoryFieldFilter';

it('mandatory-field-filter-component', () => {
	const filter = new MandatoryFieldFilter(false);
	// create React tree
	const tree = renderer.create(<MandatoryFieldFilterComponent filter={filter} />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('mandatory-field-filter-component activate', () => {
	const filter = new MandatoryFieldFilter(false);
	const onFilterChange = jest.fn();

	const filterComp = (
		<MandatoryFieldFilterComponent filter={filter} onFilterChange={onFilterChange} />
	);
	const wrapper = mount(filterComp);
	wrapper.find('input').simulate('change');

	expect(onFilterChange).toBeCalled();
});
