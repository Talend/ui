import React from 'react';
import renderer from 'react-test-renderer';

import Checkbox from './Checkbox.component';

jest.mock('react-dom');

const defaultProps = {
	id: 'id',
	onChange: () => {},
};

describe('Checkbox', () => {
	it('should render a Checkbox', () => {
		// when
		const wrapper = renderer.create(<Checkbox {...defaultProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a checked Checkbox', () => {
		// given
		const props = {
			...defaultProps,
			checked: true,
		};

		// when
		const wrapper = renderer.create(<Checkbox {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a disabled Checkbox', () => {
		// given
		const props = {
			...defaultProps,
			disabled: true,
		};

		// when
		const wrapper = renderer.create(<Checkbox {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a Checkbox with label', () => {
		// given
		const props = {
			...defaultProps,
			label: 'some label',
		};

		// when
		const wrapper = renderer.create(<Checkbox {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
