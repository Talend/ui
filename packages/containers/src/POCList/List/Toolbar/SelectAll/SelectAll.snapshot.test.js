import React from 'react';
import renderer from 'react-test-renderer';

import SelectAll from './SelectAll.component';

jest.mock('react-dom');

const props = {
	items: [{ id: 1 }, { id: 2 }],
	isSelected: jest.fn(),
	onToggleAll: jest.fn(),
};

describe('SelectAll', () => {
	it('should render', () => {
		// when
		const wrapper = renderer.create(<SelectAll {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// when
		const wrapper = renderer.create(<SelectAll id="list-toolbar" {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should be unchecked when there is no items', () => {
		// given
		const myProps = {
			items: [],
			isSelected: jest.fn(),
			onToggleAll: jest.fn(),
		};

		// when
		const wrapper = renderer.create(<SelectAll {...myProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
