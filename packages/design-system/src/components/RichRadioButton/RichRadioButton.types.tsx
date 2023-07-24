import { ReactElement } from 'react';
import { TagVariant } from '../Tag/Tag';

export type RichRadioButtonTag = {
	name: string;
	variant?: keyof typeof TagVariant;
};

export type LogoAsset = {
	illustration?: never;
	logo: string;
	name?: never;
};

export type IllustrationAsset = {
	illustration: () => ReactElement;
	logo?: never;
	name?: never;
};

export type IconAsset = {
	illustration?: never;
	logo?: never;
	name: string;
};

export type RichRadioButtonProps = {
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
};
