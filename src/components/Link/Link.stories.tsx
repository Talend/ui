import React from 'react';
import { WithSelector } from '../../docs';

import Link from './Link';

export const Template = props => <Link {...props} />;

export const defaultProps = {
	href: '#',
	children: 'Link example',
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const Hover = Template.bind({});
Hover.args = defaultProps;
Hover.decorators = [WithSelector.decorator(':hover')];

export const Active = Template.bind({});
Active.args = defaultProps;
Active.decorators = [WithSelector.decorator(':active')];

export const WithIcon = Template.bind({});
WithIcon.args = {
	...defaultProps,
	iconBefore: 'talend-info-circle',
};
export const MultiLines = Template.bind({});
MultiLines.args = {
	...defaultProps,
	iconBefore: 'talend-info-circle',
	href: 'https://www.talend.com',
	target: '_blank',
	children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac facilisis massa. Morbi et
massa nulla. Nulla vitae hendrerit diam. Aenean eu sem libero. Integer vitae quam rutrum orci
maximus imperdiet non sed lacus. Suspendisse ac est ac turpis luctus viverra. Proin tristique
accumsan eleifend. Mauris at nibh aliquet, blandit turpis quis, scelerisque eros. Cras semper
risus at felis convallis, ullamcorper rutrum augue ullamcorper. Donec malesuada felis tortor,
vel porttitor tortor tincidunt at. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas.`,
};

export const Disabled = Template.bind({});
Disabled.args = {
	...defaultProps,
	iconBefore: 'talend-info-circle',
	disabled: true,
};

export const External = Template.bind({});
External.args = {
	...defaultProps,
	href: 'https://www.talend.com',
	target: '_blank',
	children: 'talend.com',
};
