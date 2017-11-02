import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { Dialog, IconsProvider } from '../src/index';

const defaultProps = {
	show: true,
};
const headerProps = {
	header: 'Hello world',
	description: {
		text: 'Owner',
		highlight: 'John Doe',
	},
	icon: 'talend-file-csv-o',
	show: true,
};
const oldActionProps = {
	show: true,
	header: 'Hello world',
	size: 'small',
	onHide: action('onHide'),
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};
const actionProps = {
	show: true,
	header: 'Hello world',
	footer: {
		left: [
			{
				label: 'Cancel',
				onClick: action('cancel'),
				bsStyle: 'default',
			},
		],
		middle: [
			{
				displayMode: 'dropdown',
				label: 'Add as...',
				onClick: action('Add as...'),
				bsStyle: 'info',
				dropup: true,
				items: [
					{
						label: 'label 1',
					},
					{
						label: 'label 2',
					},
				],
			},
		],
		right: [
			{
				label: 'OK',
				onClick: action('ok'),
				bsStyle: 'primary',
			},
		],
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
	bsDialogProps: {
		show: true,
		size: 'small',
		onHide: action('onHide'),
		dialogClassName: 'customDialogClassName',
		keyboard: true,
		backdrop: false,
	},
	action: {
		label: 'OK',
		onClick: action('ok'),
	},
};

const children = <div>BODY content. You can put what ever you want here</div>;

const icons = {
	'talend-file-csv-o': talendIcons['talend-file-csv-o'],
};

storiesOf('Dialog', module)
	.addWithInfo('default', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...defaultProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('with header', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...headerProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('header + old action', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...oldActionProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('header + action', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...actionProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('small', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...smallProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('large', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...largeProps}>{children}</Dialog>
		</div>
	))
	.addWithInfo('passing bootstrap modal options', () => (
		<div>
			<h1>Dialog</h1>
			<IconsProvider defaultIcons={icons} />
			<Dialog {...bsProps}>{children}</Dialog>
		</div>
	));
