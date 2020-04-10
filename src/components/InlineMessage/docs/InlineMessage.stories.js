/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import InlineMessage from './../index';

export default {
	title: 'Components|InlineMessage',
	parameters: {
		component: InlineMessage,
	},
	decorators: [withKnobs],
};

export const basic = () => (
	<InlineMessage
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const information = () => (
	<InlineMessage.Information
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const informationWithBg = () => (
	<InlineMessage.Information
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		withBackground
	/>
);
export const success = () => (
	<InlineMessage.Success
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const successWithBg = () => (
	<InlineMessage.Success
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		withBackground
	/>
);
export const warning = () => (
	<InlineMessage.Warning
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const warningWithBg = () => (
	<InlineMessage.Warning
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		withBackground
	/>
);
export const destructive = () => (
	<InlineMessage.Destructive
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
	/>
);
export const destructiveWithBg = () => (
	<InlineMessage.Destructive
		title={text('title', 'Lorem ipsum')}
		description={text(
			'description',
			'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.',
		)}
		link={<a href={'#'}>{text('link', 'See more')}</a>}
		withBackground
	/>
);
