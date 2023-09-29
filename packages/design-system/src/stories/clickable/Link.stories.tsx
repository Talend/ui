import { Story } from '@storybook/react';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import { Link, IconsProvider } from '../../';
import { LinkProps } from '../../components/Link';

export default {
	component: Link,
	title: 'Clickable/Link',
	argTypes: {
		icon: {
			control: { type: 'select' },
			options: ['information-filled', 'talend-tdp-colored', 'talend-tmc-colored'],
		},
		href: { control: { type: 'text' } },
		disabled: { control: { type: 'boolean' } },
	},
};

export const Default = (props: LinkProps) => (
	<Link href="#" {...props}>
		Link example
	</Link>
);

export const WithIcon = (props: Story<LinkProps>) => (
	<Link href="#" icon="information-filled" {...props}>
		Link example
	</Link>
);

export const MultiLines = (props: Story<LinkProps>) => (
	<Link href="https://www.talend.com" target="_blank" icon="information-filled" {...props}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac facilisis massa. Morbi et massa
		nulla. Nulla vitae hendrerit diam. Aenean eu sem libero. Integer vitae quam rutrum orci maximus
		imperdiet non sed lacus. Suspendisse ac est ac turpis luctus viverra. Proin tristique accumsan
		eleifend. Mauris at nibh aliquet, blandit turpis quis, scelerisque eros. Cras semper risus at
		felis convallis, ullamcorper rutrum augue ullamcorper. Donec malesuada felis tortor, vel
		porttitor tortor tincidunt at. Pellentesque habitant morbi tristique senectus et netus et
		malesuada fames ac turpis egestas.
	</Link>
);

export const Disabled = (props: Story<LinkProps>) => (
	<Link href="#" icon="information-filled" disabled {...props}>
		Link example
	</Link>
);

export const External = (props: Story<LinkProps>) => (
	<Link href="https://www.talend.com" {...props}>
		talend.com
	</Link>
);

export const TargetBlank = (props: Story<LinkProps>) => (
	<Link href="#" target="_blank" {...props}>
		Link example
	</Link>
);

export const RouterLinkStory = () => (
	<BrowserRouter>
		<Link as={<RouterLink to="/documentation" />} icon="information-filled">
			Documentation
		</Link>
	</BrowserRouter>
);

export const Usage = (args: any) => <Link {...args} />;
Usage.args = {
	icon: 'talend-info-circle',
	children: 'Help',
	href: 'https://help.talend.com',
	disabled: false,
	hideExternalIcon: false,
};
Usage.argTypes = {
	icon: {
		description: 'Link icon before text as illustration',
		control: {
			type: 'select',
			options: [''].concat(IconsProvider.getCurrentIconIds()),
		},
	},
	href: {
		description: 'Link reference',
		control: {
			type: 'text',
		},
	},
	hideExternalIcon: {
		description: 'Button has hidden text',
		control: {
			type: 'boolean',
		},
	},
	as: {
		description: 'Polymorphic prop to give this style to a button. `string` `ReactComponentType`.',
		control: false,
	},
};
