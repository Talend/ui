import { Story } from '@storybook/react';
import React from 'react';
import Link from '.';
import { WithSelector } from '~docs';

export default {
	component: Link,
};

const defaultProps = {
	href: '#',
	children: 'Link example',
};

export const Default = {
	args: defaultProps,
};

export const Hover = {
	args: defaultProps,
	decorators: [WithSelector.decorator(':hover')],
};

export const Active = { args: defaultProps, decorators: [WithSelector.decorator(':active')] };

export const WithIcon = {
	args: {
		...defaultProps,
		iconBefore: 'talend-info-circle',
	},
};
export const MultiLines = {
	args: {
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
	},
};

export const Disabled = {
	args: {
		...defaultProps,
		iconBefore: 'talend-info-circle',
		disabled: true,
	},
};

export const External = {
	args: {
		...defaultProps,
		href: 'https://www.talend.com',
		children: 'talend.com',
	},
};

export const TargetBlank = {
	args: {
		...defaultProps,
		target: '_blank',
	},
};

export const AsButton = (props: Story) => {
	return (
		<Link onClick={() => {}} as="button" {...props}>
			Button styled as a link
		</Link>
	);
};
