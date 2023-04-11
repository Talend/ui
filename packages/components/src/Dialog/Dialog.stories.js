import { action } from '@storybook/addon-actions';

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
		onClick: action('ok'),
	},
};
const subtitle = {
	show: true,
	header: 'Hello world',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const bigTitle = {
	show: true,
	header:
		'Hello world (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.)',
	subtitle:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const errored = {
	show: true,
	header: 'Hello world',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	error: 'Vestibulum molestie id massa eu pretium.',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const informative = {
	show: true,
	header: 'Hello world',
	type: Dialog.TYPES.INFORMATIVE,
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const smallProps = {
	show: true,
	header: 'Hello world',
	size: 'small',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const bsProps = {
	header: 'OnHide + no backdrop + esc',
	show: true,
	size: 'small',
	onHide: action('onHide'),
	dialogClassName: 'customDialogClassName',
	keyboard: true,
	backdrop: false,
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};

const children = <div>BODY content. You can put what ever you want here</div>;

export default {
	title: 'Layout/Modals/Modal',
};

export const Default = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...defaultProps}>{children}</Dialog>
	</div>
);

export const WithHeader = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...headerProps}>{children}</Dialog>
	</div>
);

export const HeaderAction = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...actionProps}>{children}</Dialog>
	</div>
);

export const WithSubtitle = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...subtitle}>{children}</Dialog>
	</div>
);

export const WithLongTitleAndSubtitle = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...bigTitle}>{children}</Dialog>
	</div>
);

export const WithError = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...errored}>{children}</Dialog>
	</div>
);

export const Informative = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...informative}>{children}</Dialog>
	</div>
);

export const Small = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...smallProps}>{children}</Dialog>
	</div>
);

export const Large = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...largeProps}>{children}</Dialog>
	</div>
);

export const PassingBootstrapModalOptions = () => (
	<div>
		<h1>Dialog</h1>
		<Dialog {...bsProps}>{children}</Dialog>
	</div>
);
