import React from 'react';
import renderer from 'react-test-renderer';

import SelectDisplayMode from './SelectDisplayMode.component';

jest.mock('react-dom');

describe('SelectDisplayMode', () => {
	it('should render', () => {
		// given
		const props = {
			onSelectDisplayMode: jest.fn(),
		};

		// when
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with displayMode = table', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
			displayMode: 'table',
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with displayMode = large', () => {
		// given
		const props = {
			onSelectDisplayMode: jest.fn(),
			displayMode: 'large',
		};

		// when
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with displayMode = tile', () => {
		// given
		const props = {
			onSelectDisplayMode: jest.fn(),
			displayMode: 'tile',
		};

		// when
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});


	it('should render id if provided', () => {
		// given
		const props = {
			id: 'toolbar',
			onSelectDisplayMode: jest.fn(),
		};

		// when
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
