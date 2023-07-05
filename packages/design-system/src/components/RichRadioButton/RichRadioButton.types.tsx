import { ReactElement } from 'react';
import { TagVariant } from '../Tag/Tag';

export interface RichRadioButtonTag {
	name: string;
	variant?: keyof typeof TagVariant;
}

export interface LogoAsset {
	logo: string;
	name: never;
	illustration: never;
}

export interface IllustrationAsset {
	logo: never;
	name: never;
	illustration: () => ReactElement;
}

export interface IconAsset {
	logo: never;
	name: string;
	illustration: never;
}

export interface RichRadioButtonProps {
	dataFeature?: string;
	description?: string;
	asset?: LogoAsset | IllustrationAsset | IconAsset;
	id: string;
	isChecked?: boolean;
	isDisabled?: boolean;
	isReadOnly?: boolean;
	onChange: (value: string) => void;
	name: string;
	tags?: RichRadioButtonTag[];
	title: string;
}
