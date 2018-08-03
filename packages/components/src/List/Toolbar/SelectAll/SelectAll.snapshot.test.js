import React from 'react';
import { shallow } from 'enzyme';
import SelectAll from './SelectAll.component';

jest.mock('react-dom');

const onToggleAll = jest.fn();
const checked = jest.fn(() => true);
const items = [{ id: 1 }, { id: 2 }];

const props = {
	onToggleAll,
	checked,
	items,
};

describe('SelectAll', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<SelectAll {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('input').props().checked).toBe(true);
	});

	it('should render null if no onToggleAll or checked props', () => {
		// when
		const common = {
			items,
		};
		const withoutOnToggleAll = shallow(<SelectAll {...common} checked={jest.fn()} />);
		const withoutChecked = shallow(<SelectAll {...common} onToggleAll={jest.fn()} />);

		// then
		expect(withoutOnToggleAll.getElement()).toBe(null);
		expect(withoutChecked.getElement()).toBe(null);
	});

	it('should render id if provided', () => {
		// when
		const wrapper = shallow(<SelectAll id="list-toolbar" {...props} />);

		// then
		expect(wrapper.find('input').props().id).toBe('list-toolbar-check-all');
	});

	it('should be disabled when there are no items', () => {
		const myProps = {
			items: [],
			onToggleAll,
			checked,
		};

		// when
		const wrapper = shallow(<SelectAll id="list-toolbar" {...myProps} />);

		// then
		expect(wrapper.find('input').props().disabled).toBe(true);
	});
});
