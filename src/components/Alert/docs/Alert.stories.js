/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Alert from './../index';

export default {
	title: 'Components|Alert',
	parameters: {
		component: Alert,
	},
	decorators: [withKnobs],
};

export const basic = () => (
	<Alert
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const information = () => (
	<Alert.Information
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const informationWithBg = () => (
	<Alert.Information
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		background
	/>
);
export const success = () => (
	<Alert.Success
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const successWithBg = () => (
	<Alert.Success
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		background
	/>
);
export const warning = () => (
	<Alert.Warning
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const warningWithBg = () => (
	<Alert.Warning
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		background
	/>
);
export const destructive = () => (
	<Alert.Destructive
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const destructiveWithBg = () => (
	<Alert.Destructive
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		background
	/>
);
