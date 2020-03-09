/* eslint-disable no-plusplus */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import List from '../List';
import ConfirmDialog from './ConfirmDialog.component';
import IconsProvider from '../IconsProvider';

const icons = {
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-end': talendIcons['talend-chevron-end'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-file': talendIcons['talend-file'],
	'talend-file-json-o': talendIcons['talend-file-json-o'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-icons': talendIcons['talend-icons'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus': talendIcons['talend-plus'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-star': talendIcons['talend-star'],
	'talend-table': talendIcons['talend-table'],
	'talend-tiles': talendIcons['talend-tiles'],
	'talend-trash': talendIcons['talend-trash'],
};

const defaultProps = {
	header: 'Hello world',
	show: true,
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
		className: 'btn-inverse',
	},
};

const propsWithoutHeader = {
	show: true,
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
		className: 'btn-inverse',
	},
};

const smallProps = {
	show: true,
	header: 'Hello world',
	size: 'small',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
		className: 'btn-inverse',
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
		className: 'btn-inverse',
	},
};

const withProgressBarProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	validateAction: {
		label: 'OK',
		onClick: action('ok'),
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'CANCEL',
		onClick: action('cancel'),
		className: 'btn-inverse',
	},
	progressValue: 66,
	progressLabel: '66%',
};

const children = <div>BODY content. You can put what ever you want here</div>;

storiesOf('Layout/Modals/ConfirmDialog', module)
	.add('default', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
		</div>
	))
	.add('without header', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...propsWithoutHeader}>{children}</ConfirmDialog>
		</div>
	))
	.add('small', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...smallProps}>{children}</ConfirmDialog>
		</div>
	))
	.add('large', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...largeProps}>{children}</ConfirmDialog>
		</div>
	))
	.add('with progress bar', () => (
		<div>
			<h1>Dialog</h1>
			<ConfirmDialog {...withProgressBarProps}>{children}</ConfirmDialog>
		</div>
	))
	.add('with lots of content', () => {
		const rows = [];
		for (let index = 0; index < 50; index++) {
			rows.push(<p key={index}>The content dictate the height</p>);
		}
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog {...withProgressBarProps}>
					<div>{rows}</div>
				</ConfirmDialog>
			</div>
		);
	})
	.add('with secondary actions', () => {
		const propsWithMoreActions = {
			...defaultProps,
			header: 'Delete elements',
			validateAction: {
				label: 'Delete',
				onClick: action('ok'),
				bsStyle: 'danger',
			},
			secondaryActions: [
				{
					label: 'Show info',
					onClick: action('info'),
					bsStyle: 'info',
				},
			],
		};
		return (
			<div>
				<h1>Dialog</h1>
				<ConfirmDialog {...propsWithMoreActions}>{children}</ConfirmDialog>
			</div>
		);
	});
