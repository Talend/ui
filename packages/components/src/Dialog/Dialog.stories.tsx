import type { Meta, StoryObj } from '@storybook/react';
import Dialog from './Dialog.component';

const defaultProps = {
	show: true,
};
const headerProps = {
	header: 'Hello world',
	show: true,
};
const actionProps = {
	show: true,
	header: 'Hello world',
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const subtitle = {
	show: true,
	header: 'Hello world',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	onHide: () => console.log('onHide'),
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const bigTitle = {
	show: true,
	header:
		'Hello world (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.)',
	subtitle:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	onHide: () => console.log('onHide'),
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const errored = {
	show: true,
	header: 'Hello world',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	error: 'Vestibulum molestie id massa eu pretium.',
	onHide: () => console.log('onHide'),
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const informative = {
	show: true,
	header: 'Hello world',
	type: Dialog.TYPES.INFORMATIVE,
	onHide: () => console.log('onHide'),
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const smallProps = {
	show: true,
	header: 'Hello world',
	size: 'small' as const,
	onHide: () => console.log('onHide'),
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large' as const,
	onHide: () => console.log('onHide'),
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};
const bsProps = {
	header: 'OnHide + no backdrop + esc',
	show: true,
	size: 'small' as const,
	onHide: () => console.log('onHide'),
	dialogClassName: 'customDialogClassName',
	keyboard: true,
	backdrop: false,
	action: {
		label: 'OK',
		onClick: () => console.log('ok'),
	},
};

const children = <div>BODY content. You can put what ever you want here</div>;

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
	title: 'Components/Layout/Modals/Modal',
	component: Dialog,
	tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...defaultProps}>{children}</Dialog>
		</div>
	),
};

export const WithHeader: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...headerProps}>{children}</Dialog>
		</div>
	),
};

export const HeaderAction: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...actionProps}>{children}</Dialog>
		</div>
	),
};

export const WithSubtitle: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...subtitle}>{children}</Dialog>
		</div>
	),
};

export const WithLongTitleAndSubtitle: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...bigTitle}>{children}</Dialog>
		</div>
	),
};

export const WithError: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...errored}>{children}</Dialog>
		</div>
	),
};

export const Informative: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...informative}>{children}</Dialog>
		</div>
	),
};

export const Small: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...smallProps}>{children}</Dialog>
		</div>
	),
};

export const Large: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...largeProps}>{children}</Dialog>
		</div>
	),
};

export const PassingBootstrapModalOptions: Story = {
	render: () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...bsProps}>{children}</Dialog>
		</div>
	),
};
