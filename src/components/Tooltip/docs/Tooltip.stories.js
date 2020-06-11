/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '../../Button';
import Tooltip from '../Tooltip';

export default {
	title: 'Components/Tooltip/Stories',

	parameters: {
		component: Tooltip,
	},
};

export const basic = () => (
	<>
		<Tooltip title="Relevant information about this basic button" placement="right" visible>
			<Button onClick={action('clicked')}>Basic Button</Button>
		</Tooltip>
	</>
);

export const positions = () => (
	<>
		<Tooltip title="Relevant information about this basic button" placement="top">
			<Button onClick={action('clicked')}>Top</Button>
		</Tooltip>
		<Tooltip title="Relevant information about this basic button" placement="right">
			<Button onClick={action('clicked')}>Right</Button>
		</Tooltip>
		<Tooltip title="Relevant information about this basic button" placement="bottom">
			<Button onClick={action('clicked')}>Bottom</Button>
		</Tooltip>
		<Tooltip title="Relevant information about this basic button" placement="left">
			<Button onClick={action('clicked')}>Left</Button>
		</Tooltip>
	</>
);
