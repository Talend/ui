import { QUALITY_EMPTY_KEY, QUALITY_INVALID_KEY, QUALITY_VALID_KEY } from '../constants';

export interface QualityEntry {
	percentage: number;
	total: number;
}

export interface Quality {
	[QUALITY_INVALID_KEY]: QualityEntry;
	[QUALITY_EMPTY_KEY]: QualityEntry;
	[QUALITY_VALID_KEY]: QualityEntry;
}

export interface AgGridCellValue {
	name: string;
	value: string;
}

export interface AgCellEditorRendererPropTypes {
	value: {
		value: string;
	};
	colDef: {
		cellEditorPopup?: boolean;
		domain: string;
	};
	stopEditing: (variable?: boolean) => void;
}
