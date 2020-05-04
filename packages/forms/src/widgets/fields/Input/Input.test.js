import React from 'react';
import { shallow, mount } from 'enzyme';

describe('Input agnostic widget', () => {
	it('should use the common field template', () => {
		// given
		// when
		// then
		// wrapper.find(FieldTemplate) present and check the props
	});

	it('should render an input', () => {
		// given
		// when
		// then
		// wrapper.find(input) is present with form-control className
		// check that the other props are passed down to input element too (ex: name attribute)
	});

	it('should ensure a11y', () => {
		// given
		// when
		// then
		// wrapper.find(input) has the aria attributes
	});
});
