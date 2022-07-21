import React from 'react';

import { Column } from 'ag-grid-community';

import { ButtonIcon } from '@talend/design-system';

import { QUALITY_EMPTY_KEY, QUALITY_INVALID_KEY, QUALITY_VALID_KEY } from '../constants';

// Yeah, I know
export type Sample = {
	schema: {
		fields: any[];
	};
	data: any[];
};

export type AvroField = {
	type: any;
};

export interface Quality {
	[QUALITY_INVALID_KEY]: number;
	[QUALITY_EMPTY_KEY]: number;
	[QUALITY_VALID_KEY]: number;
}

export interface TypeInfo {
	type: string;
	typeLabel: string;
	semanticTypeId?: string;
	semanticTypeLabel?: string;
	logicalType?: string;
}

export type CellRendererParams = TypeInfo & {
	avroRenderer: Record<string, any>;
	avro: TypeInfo;
};

export type SemanticType = {
	type: string;
};

export type CellEditorParams = {
	getSemanticType(semanticType: string): Promise<SemanticType>;
	getSemanticTypeSuggestions(event: Event, search: string): Promise<string[]>;
	onSubmit(value: string, applyToAll: boolean): void;
};

export type HeaderClickParams = {
	event: React.MouseEvent<HTMLDivElement, MouseEvent>;
	column: Column;
};

export type HeaderComponentParams = TypeInfo & {
	description?: string;
	required?: boolean;
	quality?: Quality;
	isLoading?: boolean;
	draftType?: string;
	menuProps?: Omit<Parameters<typeof ButtonIcon>[0], 'icon' | 'size'> & {
		'data-feature'?: string;
	};
	qualityBarProps?: any;
	onFocus?(params: HeaderClickParams): void;
};

export interface AgGridCellValue {
	name: string;
	value: string;
}

export type GridContext = {
	selectedColumns: string[];
};

export type { ColDef } from 'ag-grid-community';
