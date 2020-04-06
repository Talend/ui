import React from 'react';
import { shallow } from 'enzyme';
import Component from './RecordsViewerLeaf.component';

describe('Component', () => {
	it('should render the leaf', () => {
		const props = {
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the leaf highlighted', () => {
		const props = {
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			nodeHighlighted: true,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the leaf with padding offset', () => {
		const props = {
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 1,
			paddingOffset: 30,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the leaf with additional value', () => {
		const props = {
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			value: {
				data: {
					value: 'myValue',
				},
				schema: {
					type: 'int',
				},
			},
			renderLeafAdditionalValue: value => (
				<div>Additional render for what you want, you can use the value : {value.data.value}</div>
			),
		};
		const wrapper = shallow(<Component {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
