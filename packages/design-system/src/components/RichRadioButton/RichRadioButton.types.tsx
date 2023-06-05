import { IconNameWithSize } from '@talend/icons';
import { ReactElement } from 'react';
import { TagVariant } from '../Tag/Tag';

export interface RichRadioButtonTag {
	name: string;
	variant?: keyof typeof TagVariant;
}

export interface RichRadioButtonAssetIcon {
	illustration?: never;
	name: IconNameWithSize<'L'>;
}

export interface RichRadioButtonAssetIllustration {
	illustration: ReactElement;
	name?: never;
}

export type RichRadioButtonAsset = RichRadioButtonAssetIcon | RichRadioButtonAssetIllustration;

export interface RichRadioButtonProps {
	dataFeature?: string;
	description?: string;
	asset?: {
		illustration?: ReactElement;
		name?: string;
	};
	id: string;
	isChecked?: boolean;
	isDisabled?: boolean;
	isReadOnly?: boolean;
	onChange: (value: string) => void;
	name: string;
	tags?: RichRadioButtonTag[];
	title: string;
}
