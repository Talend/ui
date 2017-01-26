import React from 'react';
import renderer from 'react-test-renderer';

import ItemTitle from './ItemTitle.component';

describe('ItemTitle', () => {
	it('should render text title', () => {
		// given
		const props = {
			id: 'title',
			value: 'Hello world',
		};

		// when
		const wrapper = renderer.create(<ItemTitle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render button title', () => {
		// given
		const props = {
			id: 'title',
			value: 'Hello world',
			display: 'button',
			onClick: jest.fn(),
		};

		// when
		const wrapper = renderer.create(<ItemTitle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render input title', () => {
		// given
		const props = {
			id: 'title',
			value: 'Hello world',
			display: 'input',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			onCancel: jest.fn(),
		};

		// when
		const wrapper = renderer.create(<ItemTitle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
