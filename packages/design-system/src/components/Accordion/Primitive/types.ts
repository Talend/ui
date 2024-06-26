import { ButtonIconType } from 'src/components/ButtonIcon/variations/ButtonIcon';

export type PanelHeaderAction = ButtonIconType<any> & {
	icon: string;
	tooltip: string;
	dataFeature?: string;
	callback: () => unknown;
};
