import React from 'react';
import renderer from 'react-test-renderer';

import Label from './Label.component';

jest.mock('react-dom');

describe('Label', () => {
	it('should render', () => {
		// given
		const props = {
			text: 'Text:',
		};
		// when
		const wrapper = renderer.create(
			<Label {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render for if provided', () => {
		// given
		const props = {
			text: 'Text:',
			htmlFor: 'id',
		};
		// when
		const wrapper = renderer.create(
			<Label {...props} />
		).toJSON();
		// then
		expect(wrapper).toMatchSnapshot();
	});
});
