import React from 'react';
import keycode from 'keycode';
import { shallow, mount } from 'enzyme';
import TabBar from './TabBar.component';
import { ActionButton } from '../Actions';

const tabProps = {
	id: 'my-tabs',
	className: 'tabs-classname',
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

const rightProps = {
	...tabProps,
	right: (
		<ActionButton
		    id="rightButton"
			className="btn-inverse"
			label="Add"
			bsStyle="info"
			icon="talend-plus-circle"
			onClick={() => {}}
		/>
	),
};

describe('TabBar component', () => {
	it('should render with selected children managed by user', () => {
		// given

		// when
		const wrapper = shallow(<TabBar {...tabProps}>I'm the content</TabBar>);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with right children', () => {
		// given

		// when
		const wrapper = mount(<TabBar {...rightProps}>I'm the content</TabBar>);

		// then
		expect(wrapper.find('button[id="rightButton"]').length).toBe(1);
	});

	it('should render with selected children from item definition', () => {
		// given
		const items = tabProps.items.map((item, index) => ({
			...item,
			children: <div>child {index}</div>,
		}));

		// when
		const wrapper = shallow(<TabBar {...tabProps} items={items} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should select item on click', () => {
		// given
		const onSelect = jest.fn();
		const wrapper = mount(<TabBar {...tabProps} onSelect={onSelect} />);

		// when
		wrapper.find('button').first().simulate('click');

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

	it('should select last item on end keydown', () => {
		// given
		const onSelect = jest.fn();
		const wrapper = mount(<TabBar {...tabProps} onSelect={onSelect} />);
		const event = { which: keycode.codes.end };

		// when
		wrapper.simulate('keydown', event);

		// then
		expect(onSelect).toHaveBeenCalledWith(expect.anything(), tabProps.items[4]);
	});

	it('should render with badges', () => {
		const props = {
			...tabProps,
			items: [
				{
					key: '1',
					label: 'Tab1',
					badge: {
						label: 967,
						className: 'custom-class-name',
					},
					'data-feature': 'action.1',
				},
				{
					key: '2',
					label: 'Tab2',
					badge: {
						label: '1287',
						bsStyle: 'info',
					},
					'data-feature': 'action.2',
				},
			],
		};

		const wrapper = shallow(<TabBar {...props}>I'm the content</TabBar>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
