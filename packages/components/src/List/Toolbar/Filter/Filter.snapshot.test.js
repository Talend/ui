import React from 'react';
import renderer from 'react-test-renderer';

import Filter from './Filter.component';

jest.mock('react-dom');

describe('Filter', () => {
	const noOp = jest.fn();

	it('should render', () => {
		// when
		const wrapper = renderer.create(<Filter onFilter={noOp} onToggle={noOp} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// when
		const wrapper = renderer.create(<Filter id="toolbar-filter" onFilter={noOp} onToggle={noOp} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render highlighted filter', () => {
		// when
		const wrapper = renderer.create(<Filter highlight onFilter={noOp} onToggle={noOp} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render only toggle icon', () => {
		// when
		const wrapper = renderer.create(<Filter onFilter={noOp} onToggle={noOp} docked />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render filter input with given placeholder', () => {
		// when
		const defaultProps = {
			docked: false,
			placeholder: 'find something',
		};
		const wrapper = renderer.create(<Filter {...defaultProps}/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render filter input with defaut placeholder', () => {
		// when
		const defaultProps = {
			docked: false,
		};
		const wrapper = renderer.create(<Filter {...defaultProps}/>).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
