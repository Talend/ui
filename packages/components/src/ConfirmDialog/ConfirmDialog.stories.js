/* eslint-disable no-plusplus */
import React from 'react';
import { action } from '@storybook/addon-actions';

import ConfirmDialog from './ConfirmDialog.component';

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

export default {
	title: 'Layout/Modals/ConfirmDialog',
};

export const Default = () => (
	<div>
		<h1>Dialog</h1>
		<ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
	</div>
);

Default.story = {
	name: 'default',
};

export const WithoutHeader = () => (
	<div>
		<h1>Dialog</h1>
		<ConfirmDialog {...propsWithoutHeader}>{children}</ConfirmDialog>
	</div>
);

WithoutHeader.story = {
	name: 'without header',
};

export const Small = () => (
	<div>
		<h1>Dialog</h1>
		<ConfirmDialog {...smallProps}>{children}</ConfirmDialog>
	</div>
);

Small.story = {
	name: 'small',
};

export const Large = () => (
	<div>
		<h1>Dialog</h1>
		<ConfirmDialog {...largeProps}>{children}</ConfirmDialog>
	</div>
);

Large.story = {
	name: 'large',
};

export const WithProgressBar = () => (
	<div>
		<h1>Dialog</h1>
		<ConfirmDialog {...withProgressBarProps}>{children}</ConfirmDialog>
	</div>
);

WithProgressBar.story = {
	name: 'with progress bar',
};

export const WithLotsOfContent = () => {
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
};

WithLotsOfContent.story = {
	name: 'with lots of content',
};

export const WithSecondaryActions = () => {
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
};

WithSecondaryActions.story = {
	name: 'with secondary actions',
};
