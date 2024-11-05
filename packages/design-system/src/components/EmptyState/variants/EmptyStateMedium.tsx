import { forwardRef, Ref } from 'react';

import { Illustration } from '../../illustrations';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

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
	| 'WARNING'
	| 'IN_PROGRESS'
	| 'UPDATE';

function getIllustration(icon: EmptyStateMediumIcon) {
	switch (icon) {
		case 'ACTIVITY':
			return <Illustration.IconActivity />;
		case 'CHART':
			return <Illustration.IconChart />;
		case 'CHECKLIST':
			return <Illustration.IconChecklist />;
		case 'FLASK':
			return <Illustration.IconFlask />;
		case 'LIGHTBULB':
			return <Illustration.IconLightBulb />;
		case 'MESSAGE':
			return <Illustration.IconMessage />;
		case 'PLUG':
			return <Illustration.IconPlug />;
		case 'ROCKET':
			return <Illustration.IconRocket />;
		case 'SEARCH':
			return <Illustration.IconSearch />;
		case 'SETTINGS':
			return <Illustration.IconSettings />;
		case 'USER':
			return <Illustration.IconUser />;
		case 'WARNING':
			return <Illustration.IconWarning />;
		case 'IN_PROGRESS':
			return <Illustration.IconInProgress />;
		case 'UPDATE':
			return <Illustration.IconUpdate />;
		default:
			return <Illustration.IconDefault />;
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
