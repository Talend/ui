import React from 'react';
import { IconItem, IconGallery } from '@storybook/components';

import Icon from '../Icon';
import icons from '../../../icons';

export default {
	title: 'Components|Icon',
	component: Icon,
};

const iconNames = Object.keys(icons);

export const basic = () => (
	<IconGallery>
		{iconNames.map((iconName, index) => (
			<IconItem key={index} name={iconName}>
				<Icon name={iconName} />
			</IconItem>
		))}
	</IconGallery>
);
