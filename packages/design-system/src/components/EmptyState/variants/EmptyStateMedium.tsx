import { IconActivity } from '../illustrations/IconActivity';
import { IconChart } from '../illustrations/IconChart';
import { IconChecklist } from '../illustrations/IconChecklist';
import { IconDefault } from '../illustrations/IconDefault';
import { IconFlask } from '../illustrations/IconFlask';
import { IconLightBulb } from '../illustrations/IconLightBulb';
import { IconMessage } from '../illustrations/IconMessage';
import { IconPlug } from '../illustrations/IconPlug';
import { IconRocket } from '../illustrations/IconRocket';
import { IconSearch } from '../illustrations/IconSearch';
import { IconSettings } from '../illustrations/IconSettings';
import { IconUser } from '../illustrations/IconUser';
import { IconWarning } from '../illustrations/IconWarning';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';
import { forwardRef, Ref } from 'react';

export type EmptyStateMediumIcon =
	| 'ACTIVITY'
	| 'CHART'
	| 'CHECKLIST'
	| 'DEFAULT'
	| 'FLASK'
	| 'LIGHTBULB'
	| 'MESSAGE'
	| 'PLUG'
	| 'ROCKET'
	| 'SEARCH'
	| 'SETTINGS'
	| 'USER'
	| 'WARNING';

function getIllustration(icon: EmptyStateMediumIcon) {
	switch (icon) {
		case 'ACTIVITY':
			return <IconActivity />;
		case 'CHART':
			return <IconChart />;
		case 'CHECKLIST':
			return <IconChecklist />;
		case 'FLASK':
			return <IconFlask />;
		case 'LIGHTBULB':
			return <IconLightBulb />;
		case 'MESSAGE':
			return <IconMessage />;
		case 'PLUG':
			return <IconPlug />;
		case 'ROCKET':
			return <IconRocket />;
		case 'SEARCH':
			return <IconSearch />;
		case 'SETTINGS':
			return <IconSettings />;
		case 'USER':
			return <IconUser />;
		case 'WARNING':
			return <IconWarning />;
		default:
			return <IconDefault />;
	}
}

export type EmptyStateMediumProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	description: string;
	illustration?: EmptyStateMediumIcon;
};

const EmptyStateMedium = forwardRef((props: EmptyStateMediumProps, ref: Ref<HTMLElement>) => {
	const { illustration, ...rest } = props;
	return (
		<EmptyStatePrimitive
			{...rest}
			illustration={getIllustration(illustration || 'DEFAULT')}
			ref={ref}
		/>
	);
});

EmptyStateMedium.displayName = 'EmptyStateMedium';

export default EmptyStateMedium;
