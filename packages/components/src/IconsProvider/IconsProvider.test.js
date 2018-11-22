import React from 'react';
import { mount } from 'enzyme';
import IconsProvider from './IconsProvider.component';

const fs = require('fs');
const path = require('path');

const VIEW_BOXES = ['0 0 16 16', '0 0 32 32', '0 0 50 50'];

describe('IconsProvider', () => {
	it('should render default talend-icons', () => {
		const output = [];
		const wrapper = mount(<IconsProvider />);
		const symbols = wrapper.find('symbol');
		expect(symbols.length).toBeGreaterThan(200);
		symbols.forEach(symbol => {
			const id = symbol.props().id;
			const viewBox = symbol.props().children.props.viewBox;
			const type = symbol.props().children.props.children.type;
			expect(id).toContain('talend-');
			if (VIEW_BOXES.indexOf(viewBox) === -1) {
				// eslint-disable-next-line no-console
				output.push(`* ${id} icon do not follow the rule for the viewBox`);
			}
			if (type !== 'g') {
				output.push(`* ${id} should have a group as first children`);
			}
		});
		fs.writeFileSync(path.join(__dirname, '../../../../output/icons.lint.txt'), output.join('\n'));
	});

	it('should render default talend-icons and custom icons defined on icons prop', () => {
		const customIcons = {
			custom: <svg />,
		};
		const wrapper = mount(<IconsProvider icons={customIcons} />);
		const symbols = wrapper.find('symbol');
		expect(symbols.filter(symbol => symbol.props().id === 'custom')).not.toBeUndefined();
	});

	it('should override talend icons by using defaultIcons props', () => {
		const defaultIcons = {
			default: <svg id="OverrideDefaultIcon" />,
		};
		const wrapper = mount(<IconsProvider defaultIcons={defaultIcons} />);
		const symbols = wrapper.find('symbol');
		expect(symbols.length).toBe(1);
		expect(symbols.filter(symbol => symbol.props().id === 'default')).not.toBeUndefined();
	});

	it('should override talend icons by using defaultIcons props and render custom icon', () => {
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
