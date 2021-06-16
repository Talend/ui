import React from 'react';
import { shallow } from 'enzyme';

import { FilterBarComponent } from './FilterBar.component';

jest.mock('react-dom');

describe('Filter', () => {
	const noOp = jest.fn();

	it('should render', () => {
		// when
		const wrapper = shallow(<FilterBarComponent onFilter={noOp} onToggle={noOp} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// when
		const wrapper = shallow(
			<FilterBarComponent id="toolbar-filter" onFilter={noOp} onToggle={noOp} />,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render highlighted filter', () => {
		// when
		const wrapper = shallow(<FilterBarComponent highlight onFilter={noOp} onToggle={noOp} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render only toggle icon', () => {
		// when
		const wrapper = shallow(<FilterBarComponent onFilter={noOp} onToggle={noOp} docked />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render filter input with given placeholder without remove cross', () => {
		// when
		const defaultProps = {
			docked: false,
			placeholder: 'find something',
		};
		const wrapper = shallow(<FilterBarComponent {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render filter input with default placeholder and remove cross', () => {
		// when
		const defaultProps = {
			docked: false,
			value: 'search string',
		};
		const wrapper = shallow(<FilterBarComponent {...defaultProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
