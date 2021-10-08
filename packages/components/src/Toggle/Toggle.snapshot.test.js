import React from 'react';
import { shallow } from 'enzyme';

import Toggle from './Toggle.component';

jest.mock('react-dom');

const defaultProps = {
	id: 'id',
	onChange: () => {},
};

describe('Toggle', () => {
	it('should render a Toggle', () => {
		// when
		const wrapper = shallow(<Toggle {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an intermediate Toggle', () => {
		// given
		const props = {
			...defaultProps,
			intermediate: true,
			'data-feature': 'toggle',
		};

		// when
		const wrapper = shallow(<Toggle {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a checked Toggle', () => {
		// given
		const props = {
			...defaultProps,
			checked: true,
			'data-feature': 'toggle',
		};

		// when
		const wrapper = shallow(<Toggle {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a disabled Toggle', () => {
		// given
		const props = {
			...defaultProps,
			disabled: true,
			'data-feature': 'toggle',
		};

		// when
		const wrapper = shallow(<Toggle {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a autoFocused Toggle', () => {
		// given
		const props = {
			...defaultProps,
			autoFocus: true,
		};

		// when
		const wrapper = shallow(<Toggle {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a Toggle with label', () => {
		// given
		const props = {
			...defaultProps,
			label: 'some label',
		};

		// when
		const wrapper = shallow(<Toggle {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a Checkbox', () => {
		// given
		const props = {
			...defaultProps,
			className: 'checkbox',
		};

		// when
		const wrapper = shallow(<Toggle {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass extra props to input', () => {
		// when
		const wrapper = shallow(<Toggle {...defaultProps} aria-describedby="my-error-id" />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
