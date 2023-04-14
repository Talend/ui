import { IconNameWithSize, icons } from '@talend/icons/dist/typeUtils';

import { SizedIcon } from '@talend/design-system';
import tokens from '@talend/design-tokens';

export default {
	component: SizedIcon,
};

export const IconXS = (args: { name: IconNameWithSize<'XS'>; color: string }) => {
	return <SizedIcon size="XS" name={args.name} color={args.color} />;
};
export const IconS = (args: { name: IconNameWithSize<'S'>; color: string }) => (
	<SizedIcon size="S" name={args.name} color={args.color} />
);
export const IconM = (args: { name: IconNameWithSize<'M'>; color: string }) => (
	<SizedIcon size="M" name={args.name} color={args.color} />
);
export const IconL = (args: { name: IconNameWithSize<'L'>; color: string }) => (
	<SizedIcon size="L" name={args.name} color={args.color} />
);

const colorOptions = {
	options: [
		tokens.coralColorAccentIcon,
		tokens.coralColorDangerIcon,
		tokens.coralColorNeutralIcon,
		tokens.coralColorWarningIcon,
	],
	control: { type: 'select' },
	defaultValue: tokens.coralColorNeutralIcon,
};

IconXS.argTypes = {
	name: {
		options: icons.XS,
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
	color: colorOptions,
};

IconS.argTypes = {
	name: {
		options: icons.S,
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
	color: colorOptions,
};

IconM.argTypes = {
	name: {
		options: icons.M,
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
	color: colorOptions,
};

IconL.argTypes = {
	name: {
		options: icons.L,
		control: { type: 'select' },
		defaultValue: 'pencil',
	},
	color: colorOptions,
};
