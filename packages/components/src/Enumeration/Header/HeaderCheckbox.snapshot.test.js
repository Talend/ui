import React from 'react';
import renderer from 'react-test-renderer';

import HeaderCheckbox from './HeaderCheckbox.component';

describe('HeaderCheckbox', () => {
	it('should display toggle for mass selecting', () => {
		// when
		const wrapper = renderer.create(
			<HeaderCheckbox />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
