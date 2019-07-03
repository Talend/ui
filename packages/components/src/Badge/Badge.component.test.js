import React from 'react';
import { shallow, mount } from 'enzyme';

import BadgeI18n, { Badge } from './Badge.component';

describe('Badge', () => {
	it('should render by default', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = mount(<Badge label={label} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with i18n', () => {
		// given nothing
		// when
		const wrapper = shallow(<BadgeI18n />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
