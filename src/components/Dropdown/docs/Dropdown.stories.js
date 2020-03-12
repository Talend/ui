/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import Button from '../../Button';
import Dropdown from '../Dropdown';

export default {
	title: 'Components|Dropdown',

	parameters: {
		component: Dropdown,
	},
};

export const basic = () => (
	<Dropdown
		as={Button}
		aria-label="Custom menu"
		items={[
			<button>Custom item 1</button>,
			<button>Custom item 2</button>,
			<button>Custom item 3</button>,
		]}
	>
		Menu
	</Dropdown>
);
