import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';
import { forwardRef, Ref } from 'react';
import Illustration from '../../illustrations';

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
