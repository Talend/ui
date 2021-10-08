import React from 'react';
import { shallow } from 'enzyme';
import keycode from 'keycode';
import Component, { isLoaded } from './RecordsViewerBranch.component';

describe('isLoading', () => {
	it('should return false on the initial state', () => {
		expect(isLoaded({ loading: false, loaded: false })).toEqual(false);
	});

	it('should return false when the component is loading', () => {
		expect(isLoaded({ loading: true, loaded: false })).toEqual(false);
	});

	it('should return true when the components is loaded', () => {
		expect(isLoaded({ value: {} })).toEqual(true);
	});

	it('should return true when the components is loaded', () => {
		expect(isLoaded({ loading: false, loaded: true, value: {} })).toEqual(true);
	});
});

const schema = {
	name: 'id',
	doc: 'Id',
	type: {
		type: 'integer',
	},
	'@talend-quality@': {
		0: 33,
		1: 655,
		'-1': 346,
		total: 1034,
	},
};

describe('RecordsViewerBranch', () => {
	const dataKey = 'myDataKey';
	it('should render the branch with children', () => {
		const onToggle = jest.fn();
		const stopPropagation = jest.fn();
		const preventDefault = jest.fn();

		const props = {
			dataKey,
			getChilds: jest.fn(() => [{ dataKey: 'childDataKey' }, { value: { schema } }]),
			getChildsCount: jest.fn(),
			getObjectBranchDatakey: jest.fn(() => dataKey),
			getIcon: jest.fn(),
			getQuality: jest.fn(),
			index: 0,
			jsonpath: '$',
			level: 0,
			onToggle,
			opened: true,
			recursive: jest.fn(),
			sample: { schema },
			value: { schema },
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();

		wrapper.find('div > span').simulate('click');
		wrapper
			.find('div > span')
			.simulate('keydown', { keyCode: keycode.codes.enter, stopPropagation, preventDefault });
		wrapper
			.find('div > span')
			.simulate('keydown', { keyCode: keycode.codes.space, stopPropagation, preventDefault });

		expect(onToggle).toHaveBeenCalledWith(
			undefined,
			{
				jsonpath: '$',
				opened: true,
				value: {
					schema,
				},
			},
			0,
		);
		expect(onToggle).toHaveBeenCalledTimes(3);
		expect(stopPropagation).toHaveBeenCalled();
		expect(preventDefault).toHaveBeenCalled();
	});
	it('should render the branch with length badge', () => {
		const props = {
			dataKey,
			getChildsCount: jest.fn(() => 2),
			getObjectBranchDatakey: jest.fn(() => dataKey),
			getIcon: jest.fn(),
			getQuality: jest.fn(),
			index: 0,
			jsonpath: '$',
			level: 1,
			onToggle: jest.fn(),
			value: { schema },
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the branch with additional value', () => {
		const props = {
			dataKey,
			getChildsCount: jest.fn(),
			getObjectBranchDatakey: jest.fn(() => dataKey),
			getIcon: jest.fn(),
			getQuality: jest.fn(),
			index: 0,
			jsonpath: '$',
			level: 0,
			onToggle: jest.fn(),
			opened: false,
			value: { schema },
			renderBranchAdditionalValue: value => (
				<div>Additional render for what you want, you can use the value : {value}</div>
			),
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
