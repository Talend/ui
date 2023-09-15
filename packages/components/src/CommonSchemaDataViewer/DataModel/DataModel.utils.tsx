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

export function getModelNodeCategory(
	field: CommonSchemaSampledField<CommonSchemaSampledFieldType> | CommonSchemaSampledFieldType,
): FieldCategory {
	let fieldCommonType: CommonSchemaSampledFieldType;

	if (field.hasOwnProperty('name')) {
		const commonField = field as CommonSchemaSampledField<CommonSchemaSampledFieldType>;
		if (Array.isArray(commonField.type)) {
			fieldCommonType = commonField.type.find(
				type => type !== 'null',
			) as CommonSchemaSampledFieldType;
		} else {
			fieldCommonType = commonField.type;
		}

		if (fieldCommonType.type === 'record') {
			return FieldCategory.Record;
		} else if (fieldCommonType.type === 'array') {
			return FieldCategory.Array;
		}
		return FieldCategory.Value;
	}

	const commonField = field as CommonSchemaSampledFieldType;
	if (commonField.type === 'record') {
		return FieldCategory.Record;
	} else if (commonField.type === 'array') {
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
		// if (field.hasOwnProperty('name')) {
		return (
			<DataModelRecordNode
				field={field as CommonSchemaSampledField<RecordType>}
				path={path}
				metadata={metadata}
			/>
		);
		// }
		// return <DataModelRecordNode type={field as RecordType} path={path} metadata={metadata} />;
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
