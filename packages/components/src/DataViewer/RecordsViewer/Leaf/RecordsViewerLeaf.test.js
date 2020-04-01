import React from 'react';
import { shallow } from 'enzyme';
import Component from './RecordsViewerLeaf.component';
import i18next from '../../../../i18n';

const t = i18next.t.bind(i18next);

describe('Component', () => {
	it('should render the leaf', () => {
		const props = {
			dataKey: 'myDataKey',
			getQuality: jest.fn(() => -1),
			level: 0,
			t,
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
			t,
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
			t,
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
});
