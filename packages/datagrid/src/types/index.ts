import { ButtonHTMLAttributes, DOMAttributes, HTMLAttributes } from 'react';

import { ButtonIcon } from '@talend/design-system';

import { QUALITY_EMPTY_KEY, QUALITY_INVALID_KEY, QUALITY_VALID_KEY } from '../constants';

export interface Quality {
	[QUALITY_INVALID_KEY]: number;
	[QUALITY_EMPTY_KEY]: number;
	[QUALITY_VALID_KEY]: number;
}

export interface HeaderComponentParams {
	description?: string;
	typeLabel?: string;
	semanticTypeLabel?: string;
	required?: boolean;
	quality?: Quality;
	isLoading?: boolean;
	draftType?: string;
	menuProps?: Omit<Parameters<typeof ButtonIcon>[0], 'icon' | 'size'> & {
		'data-feature'?: string;
	};
	qualityBarProps?: any;
}
