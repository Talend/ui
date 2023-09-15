import {
	ArrayType,
	CommonSchemaSampledField,
	CommonSchemaSampledFieldType,
	FieldMetadata,
	RecordType,
	ValueType,
} from '../CommonDataViewer.types';
import { DataModelArrayNode } from './DataModelArrayNode.component';
import { DataModelRecordNode } from './DataModelRecordNode.component';
import { DataModelValueNode } from './DataModelValueNode.component';

export enum FieldCategory {
	Record = 'record',
	Array = 'array',
	Value = 'value',
}

export function getSampledFieldTypeCategory(field: CommonSchemaSampledFieldType): FieldCategory {
	if (field.type === 'record') {
		return FieldCategory.Record;
	} else if (field.type === 'array') {
		return FieldCategory.Array;
	}
	return FieldCategory.Value;
}

export function getModelNodeCategory(
	field: CommonSchemaSampledField<CommonSchemaSampledFieldType>,
): FieldCategory {
	const fieldCommonType: CommonSchemaSampledFieldType = Array.isArray(field.type)
		? (field.type.find(type => type !== 'null') as CommonSchemaSampledFieldType)
		: field.type;

	if (fieldCommonType.type === 'record') {
		return FieldCategory.Record;
	} else if (fieldCommonType.type === 'array') {
		return FieldCategory.Array;
	}
	return FieldCategory.Value;
}

export function renderModelNode(
	field: CommonSchemaSampledField<CommonSchemaSampledFieldType>,
	path: string[],
	metadata?: FieldMetadata[],
) {
	const type = getModelNodeCategory(field);

	if (type === FieldCategory.Record) {
		return (
			<DataModelRecordNode
				field={field as CommonSchemaSampledField<RecordType>}
				path={path}
				metadata={metadata}
			/>
		);
	}

	if (type === FieldCategory.Array) {
		return (
			<DataModelArrayNode
				field={field as CommonSchemaSampledField<ArrayType>}
				path={path}
				metadata={metadata}
			/>
		);
	}

	if (type === FieldCategory.Value) {
		return (
			<DataModelValueNode
				field={field as CommonSchemaSampledField<ValueType>}
				path={path}
				metadata={metadata}
			/>
		);
	}

	return null;
}

export function isFieldNullable(field: CommonSchemaSampledField<CommonSchemaSampledFieldType>) {
	if (Array.isArray(field.type)) {
		return field.type.find(type => type === 'null') !== undefined;
	}
	return false;
}

function findType<T>(type: T | 'null' | undefined): type is T {
	return type !== undefined && type !== 'null';
}

export function getFieldType<T extends CommonSchemaSampledFieldType>(
	field: CommonSchemaSampledField<T>,
): T {
	if (Array.isArray(field.type)) {
		const type = field.type.find(findType);
		if (type === undefined) throw new Error('No type found');

		return type;
	}
	return field.type;
}
