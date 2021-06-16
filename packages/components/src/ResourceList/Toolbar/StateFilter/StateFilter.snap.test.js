import React from 'react';
import { shallow } from 'enzyme';

import StateFilter, { TYPES } from './StateFilter.component';

describe('StateFilter component snaps', () => {
	it('should render in default mode', () => {
		const props = {
			favorites: false,
			certified: false,
			onChange: () => {},
		};

		const wrapper = shallow(<StateFilter {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with states to set to true', () => {
		const props = {
			favorites: true,
			certified: true,
			onChange: () => {},
		};

		const wrapper = shallow(<StateFilter {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with only favorites', () => {
		const props = {
			favorites: false,
			onChange: () => {},
			types: [TYPES.FAVORITES],
		};

		const wrapper = shallow(<StateFilter {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with only certified', () => {
		const props = {
			certified: false,
			onChange: () => {},
			types: [TYPES.CERTIFIED],
		};

		const wrapper = shallow(<StateFilter {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
