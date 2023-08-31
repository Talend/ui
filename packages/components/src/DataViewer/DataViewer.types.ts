export enum QualityStatus {
	Empty = 'EMPTY',
	Invalid = 'INVALID',
	NotApplicable = 'NOT_APPLICABLE',
	Valid = 'VALID',
}

export interface DatasetSampleQuality {
	aggregated: QualityStatus;
	dqType: QualityStatus;
	dqRules: Record<string, QualityStatus>;
}

export interface DatasetSampleLeaf {
	name: string;
	value: string;
	quality: DatasetSampleQuality;
}

export interface DatasetSampleArray {
	name: string;
	items: DatasetSampleHierarchicalRow[];
}

export interface DatasetSampleHierarchicalRow {
	fields: DatasetSampleItem[];
}

export interface DatasetSampleNode {
	name: string;
	fields: DatasetSampleItem[];
}

type DatasetSampleItem = DatasetSampleNode | DatasetSampleLeaf | DatasetSampleArray;

export type DatasetHierarchicalSample = DatasetSampleHierarchicalRow[];
