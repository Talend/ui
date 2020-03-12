/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import Alert from './../index';

export default {
	title: 'Components|Alert',

	parameters: {
		component: Alert,
	},
};

export const basic = () => (
	<Alert title={'title'} description={'lorem ipsum dolor sit amet'} link={<a href={'#'}>link</a>} />
);
export const information = () => (
	<Alert.Information
		title={'title'}
		description={'lorem ipsum dolor sit amet'}
		link={<a href={'#'}>link</a>}
	/>
);
export const success = () => (
	<Alert.Success
		title={'title'}
		description={'lorem ipsum dolor sit amet'}
		link={<a href={'#'}>link</a>}
	/>
);
export const warning = () => (
	<Alert.Warning
		title={'title'}
		description={'lorem ipsum dolor sit amet'}
		link={<a href={'#'}>link</a>}
	/>
);
export const destructive = () => (
	<Alert.Destructive
		title={'title'}
		description={'lorem ipsum dolor sit amet'}
		link={<a href={'#'}>link</a>}
	/>
);
