import React from 'react';
import { shallow } from 'enzyme';

import Filter from './Filter.component';

jest.mock('react-dom');

describe('Filter', () => {
	const noOp = jest.fn();

	it('should render', () => {
		// when
		const wrapper = shallow(<Filter onFilter={noOp} onToggle={noOp} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// when
		const wrapper = shallow(<Filter id="toolbar-filter" onFilter={noOp} onToggle={noOp} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render highlighted filter', () => {
		// when
		const wrapper = shallow(<Filter highlight onFilter={noOp} onToggle={noOp} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render only toggle icon', () => {
		// when
		const wrapper = shallow(<Filter onFilter={noOp} onToggle={noOp} docked />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render filter input with given placeholder', () => {
		// when
		const defaultProps = {
			docked: false,
			placeholder: 'find something',
		};
		const wrapper = shallow(<Filter {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render filter input with default placeholder', () => {
		// when
		const defaultProps = {
			docked: false,
		};
		const wrapper = shallow(<Filter {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
