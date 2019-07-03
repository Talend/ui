import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Badge from './Badge.component';

describe('Badge', () => {
	it('should render by default', () => {
		// given nothing
		// when
		const wrapper = mount(<Badge />);
		// then
		expect(toJson(wrapper)).toMatchSnapshot();
		expect(wrapper.html()).toMatchSnapshot();
	});
});

// describe('BadgeSpec', () => {
// 	it('should render Badge', () => {
// 		// given
// 		const props = {
// 			id: 'my-badge',
// 			label: 'Label',
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});

// 	it('should render Badge as button', () => {
// 		// given
// 		const props = {
// 			id: 'my-badge',
// 			label: 'Label',
// 			onSelect: jest.fn(),
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});

// 	it('should render Badge with delete icon', () => {
// 		// given
// 		const props = {
// 			id: 'my-badge',
// 			label: 'Label',
// 			onDelete: () => {},
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});

// 	it('should render selected Badge with delete icon', () => {
// 		// given
// 		const props = {
// 			label: 'Label',
// 			selected: true,
// 			onDelete: () => {},
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});

// 	it('should render disabled Badge with delete icon and delete id', () => {
// 		// given
// 		const props = {
// 			label: 'Label',
// 			disabled: true,
// 			onDelete: () => {},
// 			id: 'delete',
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});

// 	it('should render Badge with selection handler and select id', () => {
// 		// given
// 		const props = {
// 			label: 'Label',
// 			onSelect: () => {},
// 			id: 'select',
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});

// 	it('should render Badge with category and delete icon', () => {
// 		// given
// 		const props = {
// 			label: 'Label',
// 			category: 'Category',
// 			onDelete: () => {},
// 		};
// 		// when
// 		const wrapper = shallow(<Badge.WrappedComponent {...props} />);
// 		// then
// 		expect(wrapper.getElement()).toMatchSnapshot();
// 	});
// });
