import React from 'react';
import { mount } from 'enzyme';
import { ItemsComponent } from './Items.component';
import toJsonWithoutI18n from '../../../test/props-without-i18n';

jest.mock(
	'react-virtualized/dist/commonjs/AutoSizer/AutoSizer',
	() => props => <div id="autoSizer">{props.children({ height: 30, width: 30 })}</div>, // eslint-disable-line react/prop-types
);

describe('Items', () => {
	const props = {
		items: [
			{ label: 'Lorem ipsum dolor sit amet 0' },
			{ label: 'Lorem ipsum dolor sit amet 1', checked: true },
			{ label: 'Lorem ipsum dolor sit amet 2' },
		],
		getItemHeight: () => 42,
	};

	const propsNested = {
		items: [
			{ label: 'Lorem ipsum dolor default' },
			{ label: 'Lorem ipsum dolor Parent', checked: true, children: props.items },
		],
		getItemHeight: () => 42,
	};

	it('should render', () => {
		// when
		const wrapper = mount(<ItemsComponent {...props} />);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should render with provided id', () => {
		// when
		const wrapper = mount(<ItemsComponent {...props} id="my-widget" />);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should render without toggleAll checkbox', () => {
		// when
		const wrapper = mount(<ItemsComponent {...props} showToggleAll={false} />);

		// then
		expect(wrapper.find('#tc-listview-toggle-all').exists()).toBeFalsy();
	});

	it('should render with nested items', () => {
		// when
		const wrapper = mount(<ItemsComponent {...propsNested} />);

		// then
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});
});
