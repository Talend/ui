import React from 'react';
import { mount } from 'enzyme';
import IconsProvider from './IconsProvider.component';

describe('IconsProvider', () => {
	it('should render default custom icons defined on icons prop', () => {
		const customIcons = {
			custom: <svg />,
		};
		const wrapper = mount(<IconsProvider icons={customIcons} />);
		const symbols = wrapper.find('symbol');
		expect(symbols.filter(symbol => symbol.props().id === 'custom')).not.toBeUndefined();
	});
	it('should support defaultIcons props', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const wrapper = mount(<IconsProvider defaultIcons={defaultIcons} />);
		const symbols = wrapper.find('symbol');
		expect(symbols.length).toBe(1);
		expect(symbols.filter(symbol => symbol.props().id === 'default')).not.toBeUndefined();
	});

	it('should support defaultIcons props and render custom icon', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const customIcons = {
			custom: <svg id="customIcon" />,
		};
		const wrapper = mount(<IconsProvider defaultIcons={defaultIcons} icons={customIcons} />);
		const symbols = wrapper.find('symbol');
		expect(symbols.length).toBe(2);
	});
});
