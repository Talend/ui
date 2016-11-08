import React from 'react';
import renderer from 'react-test-renderer';

import IconsProvider from './IconsProvider.component';

describe('IconsProvider', () => {
	it('should render default talend-icons', () => {
		const wrapper = renderer.create(<IconsProvider />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render default talend-icons and custom icons defined on icons prop', () => {
		const customIcons = {
			custom: '<svg id="customIcon"></svg>',
		};
		const wrapper = renderer.create(<IconsProvider icons={customIcons} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should override talend icons by using defaultIcons props', () => {
		const defaultIcons = {
			default: '<svg id="OverrideDefaultIcon"></svg>',
		};
		const wrapper = renderer.create(<IconsProvider defaultIcons={defaultIcons} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should override talend icons by using defaultIcons props and render custom icon', () => {
		const defaultIcons = {
			default: '<svg id="OverrideDefaultIcon"></svg>',
		};
		const customIcons = {
			custom: '<svg id="customIcon"></svg>',
		};
		const wrapper = renderer.create(
			<IconsProvider defaultIcons={defaultIcons} icons={customIcons} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
