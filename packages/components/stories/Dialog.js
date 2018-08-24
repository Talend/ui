import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

import { Dialog } from '../src/index';

import './Dialog.css';

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
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const bigTitle = {
	show: true,
	header: 'Hello world (Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.)',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

const children = (<div>BODY content. You can put what ever you want here</div>);


storiesOf('Dialog', module)
	.addDecorator(checkA11y)
	.addWithInfo('default', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...defaultProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('with header', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...headerProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('header + action', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...actionProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('with subtitle', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...subtitle}>{children}</Dialog>
		</div>
	))
	.addWithInfo('with long title and subtitle', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...bigTitle}>{children}</Dialog>
		</div>
	))
	.addWithInfo('with error', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...errored}>{children}</Dialog>
		</div>
	))
	.addWithInfo('informative', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...informative}>{children}</Dialog>
		</div>
	))
	.addWithInfo('small', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...smallProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('large', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...largeProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('passing bootstrap modal options', () => (
		<div>
			<h1>Dialog</h1>
			<Dialog {...bsProps}>{children}</Dialog>
		</div>
	));
