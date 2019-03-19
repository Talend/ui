import React from 'react';
import { shallow } from 'enzyme';
import Component from './ColumnChooserRowRenderer.component';

const t = jest.fn((_, translationValue) => translationValue.defaultValue);

describe('ColumnChooserRowRenderer', () => {
	it('should render', () => {
		// given
		const props = {
			label: 'myLabel',
			hidden: false,
			locked: false,
			order: 1,
			length: 3,
			onChangeVisibility: jest.fn(),
			onBlurOrder: jest.fn(),
			onKeyPressOrder: jest.fn(),
			t,
		};
		// when
		const wrapper = shallow(<Component {...props} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
