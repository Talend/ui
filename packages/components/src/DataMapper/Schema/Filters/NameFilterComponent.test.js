//import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
//import TestUtils from 'react-dom/test-utils';
import NameFilterComponent from './NameFilterComponent';
import NameFilter from './NameFilter';
// import * as TestData from './TestData';
// import DefaultDataAccessor from '../../DefaultDataAccessor';
// import DataAccessorWrapper from '../../DataAccessorWrapper';

//const dataAccessor = new DataAccessorWrapper(new DefaultDataAccessor());

it('name-filter-component', () => {
  const filter = new NameFilter(false);
	// create React tree
	const tree = renderer
		.create(
			<NameFilterComponent
				filter={filter}
			/>,
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

// it('name-filter-component activate', () => {
//
//   const filter = new NameFilter(false);
//   const onFilterChange = jest.fn();
//
//   const filterComp = (
//     <NameFilterComponent
//       filter={filter}
//       onFilterChange={onFilterChange}
//     />
//   );
//   const wrapper = mount(filterComp);
//   wrapper
//     .find('.filter-name')
//     .at(0)
//     .simulate('click');
//
//
//   //expect(clearMapping).toBeCalled();
// });
