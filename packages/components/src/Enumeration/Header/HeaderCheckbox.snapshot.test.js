import React from 'react';
import renderer from 'react-test-renderer';

import HeaderCheckbox from './HeaderCheckbox.component';

describe('HeaderCheckbox', () => {
	it('should display toggle for mass selecting', () => {
		// given
		const props = {
			headerDefault: [],
		};

		// when
		const wrapper = renderer.create(
			<HeaderCheckbox {...props}/>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
