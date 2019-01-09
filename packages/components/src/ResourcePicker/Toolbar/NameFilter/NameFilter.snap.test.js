import React from 'react';
import { shallow } from 'enzyme';

import NameFilter from './NameFilter.component';

describe('NameFilter component snaps', () => {
	describe('renderers', () => {
		it('should render NameFilter in default mode', () => {
			const props = {
				onChange: () => {},
				label: 'Example label',
				placeholder: 'Example placeholder',
			};

			const wrapper = shallow(<NameFilter {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render NameFilter without label', () => {
			const props = {
				onChange: () => {},
				placeholder: 'Example placeholder',
			};

			const wrapper = shallow(<NameFilter {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render NameFilter without placeholder', () => {
			const props = {
				onChange: () => {},
				label: 'Example label',
			};

			const wrapper = shallow(<NameFilter {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render NameFilter without placeholder and label', () => {
			const props = {
				onChange: () => {},
			};

			const wrapper = shallow(<NameFilter {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
