import React from 'react';
import { shallow } from 'enzyme';

import SortOptions, { TYPES } from './SortOptions.component';

describe('SortOptions component snaps', () => {
	describe('renderers', () => {
		it('should render SortOptions in default mode', () => {
			const props = {
				onChange: () => {},
			};

			const wrapper = shallow(<SortOptions.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render SortOptions with name in ASC mode', () => {
			const props = {
				onChange: () => {},
				nameAsc: true,
			};

			const wrapper = shallow(<SortOptions.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render SortOptions with date in ASC mode', () => {
			const props = {
				onChange: () => {},
				dateAsc: true,
			};

			const wrapper = shallow(<SortOptions.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render SortOptions with only the date type', () => {
			const props = {
				onChange: () => {},
				dateAsc: true,
				types: [TYPES.DATE],
			};

			const wrapper = shallow(<SortOptions.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render SortOptions with only the name type', () => {
			const props = {
				onChange: () => {},
				dateAsc: true,
				types: [TYPES.NAME],
			};

			const wrapper = shallow(<SortOptions.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should not render SortOptions when no type is specified', () => {
			const props = {
				onChange: () => {},
				dateAsc: true,
				types: [],
			};

			const wrapper = shallow(<SortOptions.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
