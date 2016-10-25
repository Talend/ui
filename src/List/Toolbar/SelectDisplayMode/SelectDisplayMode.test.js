import React from 'react';
import renderer from 'react-test-renderer';

import SelectDisplayMode from './SelectDisplayMode.component';

jest.mock('react-dom');

describe('SelectDisplayMode', () => {
	it('should render', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
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
		const props = {
			onSelectDisplayMode: jest.fn(),
			displayMode: 'large',
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with displayMode = tile', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
			displayMode: 'tile',
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
