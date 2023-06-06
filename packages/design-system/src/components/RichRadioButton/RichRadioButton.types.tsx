import { ReactElement } from 'react';
import { TagVariant } from '../Tag/Tag';

export interface RichRadioButtonTag {
	name: string;
	variant?: keyof typeof TagVariant;
}

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
