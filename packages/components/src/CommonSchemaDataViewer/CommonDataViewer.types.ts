// RECORDS
export enum QualityStatus {
	Empty = 'EMPTY',
	Invalid = 'INVALID',
	NotApplicable = 'NOT_APPLICABLE',
	Valid = 'VALID',
}

export interface SampleQuality {
	aggregated: QualityStatus;
	dqType: QualityStatus;
	dqRules: Record<string, QualityStatus>[];
}

export interface SampleLeaf {
	name: string;
	value: string | string[];
	quality: SampleQuality;
}

export interface SampleArray {
	name: string;
	items: SampleHierarchicalRow[];
}

export interface SampleNode {
	name: string;
	fields: SampleItem[];
}

type SampleItem = SampleNode | SampleLeaf | SampleArray;

export interface SampleHierarchicalRow {
	fields: SampleItem[];
}
export type HierarchicalSample = SampleHierarchicalRow[];

// METADATA

export type DqRulesBinding = {
	varName: string;
	value: string;
	type: 'VAL' | 'COLUMN';
};

export interface MetadataQuality {
	valid: number;
	invalid: number;
	empty: number;
	total: number;
}

export type FieldRuleMetadata = {
	id?: string;
	ruleId: string;
	isCompliant?: boolean;
	dqRulesBindings: DqRulesBinding[];
};

export type RuleQuality = {
	id?: string;
	notExecutable: number;
	notApplicable: number;
} & Omit<MetadataQuality, 'empty'>;

export type FieldMatching = {
	id: string;
	name: string;
	score: number;
};

export type FieldMetadata = {
	path: string;
	description: string;
	type: {
		status: 'NOT_FORCED' | 'PRIMITIVE_FORCED' | 'SEMANTIC_FORCED';
		originalType: string;
		semanticType?: string;
		primitiveType?: string;
	};
	dqRules: FieldRuleMetadata[];
	matchings: FieldMatching[];
	qualities: {
		aggregated: MetadataQuality;
		type: MetadataQuality;
		dqRules: RuleQuality[];
	};
};

// SCHEMA

export type CommonSchemaOriginalFieldMetadata = {
	type: string;
	size: number;
};

export type RecordType = {
	type: string; //'record';
	namespace: string;
	fields: CommonSchemaSampledField<CommonSchemaSampledFieldType>[];
	'talend.fields.order': string;
};

export type ArrayType = {
	type: string; //'array';
	items: (CommonSchemaSampledFieldType | 'null')[];
};

export type ValueType = {
	type: string;
	isForced: boolean;
	isNativeForced: boolean;
	dqType: string;
	dqTypeId: string;
	dqNativeType: string;
};

export type CommonSchemaSampledFieldType = RecordType | ArrayType | ValueType;

export type CommonSchemaSampledField<T extends CommonSchemaSampledFieldType> = {
	name: string;
	type: (T | 'null')[] | T;
	originalFieldName?: string;
	originalFieldMetadata?: CommonSchemaOriginalFieldMetadata;
};

export type CommonSchemaSampled = {
	name: string;
} & RecordType;
