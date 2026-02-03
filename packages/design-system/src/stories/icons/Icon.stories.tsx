import { Icon, StackHorizontal } from '../../';
import { AllIconsTemplate } from './Icons';

export default {
	title: 'Icons/Icon',
};

type UsageProps = {
	name: string;
};

export const Usage = (args: UsageProps) => (
	<StackHorizontal gap="XS">
		<Icon name={args.name} style={{ width: '0.75rem', height: '0.75rem' }} />
		<Icon name={args.name} />
		<Icon name={args.name} style={{ width: '1.5rem', height: '1.5rem' }} />
	</StackHorizontal>
);

Usage.args = {
	name: 'talend-cross',
};
Usage.argTypes = {
	name: {
		control: 'string',
	},
};

export const AllIcons = () => (
	<AllIconsTemplate>
		{({ name, size, transform, border, filter, useCurrentColor }) => (
			<Icon
				name={name}
				size={size}
				transform={transform}
				border={border}
				filter={filter}
				useCurrentColor={useCurrentColor}
			/>
		)}
	</AllIconsTemplate>
);
AllIcons.parameters = {
	chromatic: { disableSnapshot: true },
};
