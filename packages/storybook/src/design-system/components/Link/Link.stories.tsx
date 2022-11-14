import React from 'react';
import { Story } from '@storybook/react';
import { WithSelector } from '~docs';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import { Link, LinkProps } from '@talend/design-system';

export default {
	component: Link,
};

export const Default = {
	render(props: Story<LinkProps>) {
		return (
			<Link href="#" {...props}>
				Link example
			</Link>
		);
	},
};

export const Hover = {
	decorators: [WithSelector.decorator(':hover')],
	render(props: Story<LinkProps>) {
		return (
			<Link href="#" {...props}>
				Link example
			</Link>
		);
	},
};

export const Active = {
	decorators: [WithSelector.decorator(':active')],
	render(props: Story<LinkProps>) {
		return (
			<Link href="#" {...props}>
				Link example
			</Link>
		);
	},
};

export const WithIcon = {
	render: (props: Story<LinkProps>) => (
		<Link href="#" icon="information-filled" {...props}>
			Link example
		</Link>
	),
};

export const MultiLines = {
	render: (props: Story<LinkProps>) => (
		<Link href="https://www.talend.com" target="_blank" icon="information-filled" {...props}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac facilisis massa. Morbi et
			massa nulla. Nulla vitae hendrerit diam. Aenean eu sem libero. Integer vitae quam rutrum orci
			maximus imperdiet non sed lacus. Suspendisse ac est ac turpis luctus viverra. Proin tristique
			accumsan eleifend. Mauris at nibh aliquet, blandit turpis quis, scelerisque eros. Cras semper
			risus at felis convallis, ullamcorper rutrum augue ullamcorper. Donec malesuada felis tortor,
			vel porttitor tortor tincidunt at. Pellentesque habitant morbi tristique senectus et netus et
			malesuada fames ac turpis egestas.
		</Link>
	),
};

export const Disabled = {
	render(props: Story<LinkProps>) {
		return (
			<Link href="#" icon="information-filled" disabled {...props}>
				Link example
			</Link>
		);
	},
};

export const External = {
	render(props: Story<LinkProps>) {
		return (
			<Link href="https://www.talend.com" {...props}>
				talend.com
			</Link>
		);
	},
};

export const TargetBlank = {
	render(props: Story<LinkProps>) {
		return (
			<Link href="#" target="_blank" {...props}>
				Link example
			</Link>
		);
	},
};

export const RouterLinkStory = () => (
	<BrowserRouter>
		<Link as={<RouterLink to="/documentation" />} icon="information-filled">
			Documentation
		</Link>
	</BrowserRouter>
);
