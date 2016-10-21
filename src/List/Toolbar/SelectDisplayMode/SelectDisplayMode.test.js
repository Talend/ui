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
	it('should render with selected = table', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
			selected: 'table',
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with selected = large', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
			selected: 'large',
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with selected = tile', () => {
		const props = {
			onSelectDisplayMode: jest.fn(),
			selected: 'tile',
		};
		const wrapper = renderer.create(
			<SelectDisplayMode {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
