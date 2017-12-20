import React from 'react';
import renderer from 'react-test-renderer';

import SelectDisplayMode from './SelectDisplayMode.component';

jest.mock('react-dom');

const requiredProps = {
	onChange: jest.fn(),
};

describe('SelectDisplayMode', () => {
	it('should render', () => {
		// when
		const wrapper = renderer.create(
			<SelectDisplayMode {...requiredProps} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with displayMode = table', () => {
		// when
		const wrapper = renderer.create(
			<SelectDisplayMode mode="table" {...requiredProps} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with displayMode = large', () => {
		// when
		const wrapper = renderer.create(
			<SelectDisplayMode mode="large" {...requiredProps} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// when
		const wrapper = renderer.create(
			<SelectDisplayMode id="toolbar-display-mode" {...requiredProps} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
