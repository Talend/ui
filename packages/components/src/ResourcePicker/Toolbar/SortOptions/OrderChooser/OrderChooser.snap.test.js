import React from 'react';
import { shallow } from 'enzyme';

import OrderChooser from './OrderChooser.component';

describe('OrderChooser component snaps', () => {
	describe('renderers', () => {
		it('should render OrderChooser in default mode', () => {
			const props = {
				icon: 'talend-sort-desc',
				label: 'Sort by date',
			};

			const wrapper = shallow(<OrderChooser {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('renderers', () => {
		it('should render OrderChooser in asc mode', () => {
			const props = {
				icon: 'talend-sort-desc',
				label: 'Sort by date',
				asc: true,
			};

			const wrapper = shallow(<OrderChooser {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
