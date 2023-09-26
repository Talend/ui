// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize, icons } from '@talend/icons/dist/typeUtils';
import tokens from '@talend/design-tokens';

import { SizedIcon, StackHorizontal } from '../../';

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
	control: {
		type: 'select',
		labels: {
			[tokens.coralColorSuccessIcon]: 'Success',
			[tokens.coralColorAccentIcon]: 'Accent',
			[tokens.coralColorDangerIcon]: 'Danger',
			[tokens.coralColorNeutralIcon]: 'Neutral',
			[tokens.coralColorWarningIcon]: 'Warning',
		},
	},
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
	size: {
		table: {
			disable: true,
		},
	},
};
IconXS.args = defaultArgs;

IconS.argTypes = {
	name: {
		options: icons.S,
		control: { type: 'select' },
	},
	color: colorOptions,
	size: {
		table: {
			disable: true,
		},
	},
};
IconS.args = defaultArgs;

IconM.argTypes = {
	name: {
		options: icons.M,
		control: { type: 'select' },
	},
	color: colorOptions,
	size: {
		table: {
			disable: true,
		},
	},
};
IconM.args = defaultArgs;

IconL.argTypes = {
	name: {
		options: icons.L,
		control: { type: 'select' },
	},
	color: colorOptions,
	size: {
		table: {
			disable: true,
		},
	},
};
IconL.args = defaultArgs;

export const Example = () => (
	<StackHorizontal gap="XS">
		<SizedIcon size="S" name="note-pencil" />
		<SizedIcon size="M" name="note-pencil" />
		<SizedIcon size="L" name="note-pencil" />
	</StackHorizontal>
);
