import {
	ArrayType,
	CommonSchemaSampledField,
	CommonSchemaSampledFieldType,
	FieldMetadata,
	RecordType,
	ValueType,
} from '../CommonDataViewer.types';
import { ModelArrayField } from './ModelArrayField.component';
import { ModelRecordField } from './ModelRecordField.component';
import { ModelValueField } from './ModelValueField.component';

enum FieldTypes {
	Record = 'record',
	Array = 'array',
	Value = 'value',
}

function getFieldType(
	field: CommonSchemaSampledField<CommonSchemaSampledFieldType> | CommonSchemaSampledFieldType,
): FieldTypes {
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
			return FieldTypes.Record;
		} else if (fieldCommonType.type === 'array') {
			return FieldTypes.Array;
		}
		return FieldTypes.Value;
	}

	const commonField = field as CommonSchemaSampledFieldType;
	if (commonField.type === 'record') {
		return FieldTypes.Record;
	} else if (commonField.type === 'array') {
		return FieldTypes.Array;
	}
	return FieldTypes.Value;
}

export function renderField(
	field: CommonSchemaSampledField<CommonSchemaSampledFieldType> | CommonSchemaSampledFieldType,
	path: string[],
	metadata?: FieldMetadata[],
) {
	const type = getFieldType(field);

	if (type === FieldTypes.Record) {
		return <ModelRecordField field={field as RecordType} path={path} metadata={metadata} />;
	}

	if (type === FieldTypes.Array) {
		return (
			<ModelArrayField
				field={field as CommonSchemaSampledField<ArrayType>}
				path={path}
				metadata={metadata}
			/>
		);
	}

	if (type === FieldTypes.Value) {
		return (
			<ModelValueField
				field={field as CommonSchemaSampledField<ValueType>}
				path={path}
				metadata={metadata}
			/>
		);
	}

	return null;
}
