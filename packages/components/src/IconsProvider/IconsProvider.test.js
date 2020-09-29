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
});
