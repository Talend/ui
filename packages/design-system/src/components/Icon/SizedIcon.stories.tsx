import React from 'react';
import { IconNameWithSize, icons } from '@talend/icons';

import { SizedIcon } from './SizedIcon';

export default {
	component: SizedIcon,
};

export const IconXS = (args: { name: IconNameWithSize<'XS'> }) => {
	return <SizedIcon size="XS" name={args.name} />;
};
export const IconS = (args: { name: IconNameWithSize<'S'> }) => (
	<SizedIcon size="S" name={args.name} />
);
export const IconM = (args: { name: IconNameWithSize<'M'> }) => (
	<SizedIcon size="M" name={args.name} />
);
export const IconL = (args: { name: IconNameWithSize<'L'> }) => (
	<SizedIcon size="L" name={args.name} />
);

IconXS.argTypes = {
	name: {
		options: icons.XS,
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
};

IconS.argTypes = {
	name: {
		options: ['pencil'],
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
};

IconM.argTypes = {
	name: {
		options: ['pencil'],
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
};

IconL.argTypes = {
	name: {
		options: ['pencil'],
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
};
