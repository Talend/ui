import React from 'react';
import renderer from 'react-test-renderer';

import Toggle from './Toggle.component';

jest.mock('react-dom');

const defaultProps = {
	id: 'id',
	onChange: () => {},
};

describe('Toggle', () => {
	it('should render a Toggle', () => {
		// when
		const wrapper = renderer.create(<Toggle {...defaultProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a checked Toggle', () => {
		// given
		const props = {
			...defaultProps,
			checked: true,
		};

		// when
		const wrapper = renderer.create(<Toggle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a disabled Toggle', () => {
		// given
		const props = {
			...defaultProps,
			disabled: true,
		};

		// when
		const wrapper = renderer.create(<Toggle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a autoFocused Toggle', () => {
		// given
		const props = {
			...defaultProps,
			autoFocus: true,
		};

		// when
		const wrapper = renderer.create(<Toggle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a Toggle with label', () => {
		// given
		const props = {
			...defaultProps,
			label: 'some label',
		};

		// when
		const wrapper = renderer.create(<Toggle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a Checkbox', () => {
		// given
		const props = {
			...defaultProps,
			className: 'checkbox',
		};

		// when
		const wrapper = renderer.create(<Toggle {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
