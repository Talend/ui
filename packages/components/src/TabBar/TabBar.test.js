import React from 'react';
import keycode from 'keycode';
import { shallow, mount } from 'enzyme';
import TabBar from './TabBar.component';

const tabProps = {
	id: 'my-tabs',
	items: [
		{
			key: '1',
			label: 'Tab1',
			'data-feature': 'action.1',
		},
		{
			key: '2',
			label: 'Tab2',
			'data-feature': 'action.2',
		},
		{
			key: '3',
			label: 'Tab3',
			'data-feature': 'action.3',
		},
		{
			key: '4',
			label: 'Tab4',
			'data-feature': 'action.4',
		},
		{
			key: '5',
			label: 'Tab5',
			'data-feature': 'action.5',
		},
	],
	onSelect: jest.fn(),
	selectedKey: '3',
};

describe('TabBar component', () => {
	it('should render', () => {
		// given

		// when
		const wrapper = shallow(<TabBar {...tabProps}>I'm the content</TabBar>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should select item on click', () => {
		// given
		const onSelect = jest.fn();
		const wrapper = mount(<TabBar {...tabProps} onSelect={onSelect} />);

		// when
		wrapper
			.find('a')
			.first()
			.simulate('click');

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[0]);
	});

	it('should select first item on home keydown', () => {
		// given
		const onSelect = jest.fn();
		const wrapper = mount(<TabBar {...tabProps} onSelect={onSelect} />, {
			attachTo: document.body,
		});
		const event = { which: keycode.codes.home };

		// when
		wrapper.simulate('keydown', event);

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[0]);
	});

	it('should select first item on end keydown', () => {
		// given
		const onSelect = jest.fn();
		const wrapper = mount(<TabBar {...tabProps} onSelect={onSelect} />);
		const event = { which: keycode.codes.end };

		// when
		wrapper.simulate('keydown', event);

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[4]);
	});
});
