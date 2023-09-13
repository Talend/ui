// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize, icons } from '@talend/icons/dist/typeUtils';

import { SizedIcon } from '../';
import tokens from '@talend/design-tokens';

export default {
	title: 'Icons/SizedIcon',
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
		tokens.coralColorSuccessIcon,
		tokens.coralColorAccentIcon,
		tokens.coralColorDangerIcon,
		tokens.coralColorNeutralIcon,
		tokens.coralColorWarningIcon,
	],
	control: { type: 'select' },
};
const defaultColor = tokens.coralColorNeutralIcon;
const defaultName = 'pencil';
const defaultArgs = {
	color: defaultColor,
	name: defaultName,
};

IconXS.argTypes = {
	name: {
		options: icons.XS,
		control: { type: 'select' },
	},
	color: colorOptions,
};
IconXS.args = defaultArgs;

IconS.argTypes = {
	name: {
		options: icons.S,
		control: { type: 'select' },
	},
	color: colorOptions,
};
IconS.args = defaultArgs;

IconM.argTypes = {
	name: {
		options: icons.M,
		control: { type: 'select' },
	},
	color: colorOptions,
};
IconM.args = defaultArgs;

IconL.argTypes = {
	name: {
		options: icons.L,
		control: { type: 'select' },
	},
	color: colorOptions,
};
IconL.args = defaultArgs;
