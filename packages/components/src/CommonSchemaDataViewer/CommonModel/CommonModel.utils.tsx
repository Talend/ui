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

export enum FieldCategory {
	Record = 'record',
	Array = 'array',
	Value = 'value',
}

export function getFieldCategory(
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

export function renderField(
	field: CommonSchemaSampledField<CommonSchemaSampledFieldType> | CommonSchemaSampledFieldType,
	path: string[],
	metadata?: FieldMetadata[],
) {
	const type = getFieldCategory(field);

	if (type === FieldCategory.Record) {
		if (field.hasOwnProperty('name')) {
			return (
				<ModelRecordField
					field={field as CommonSchemaSampledField<RecordType>}
					path={path}
					metadata={metadata}
				/>
			);
		}
		return <ModelRecordField type={field as RecordType} path={path} metadata={metadata} />;
	}

	if (type === FieldCategory.Array) {
		return (
			<ModelArrayField
				field={field as CommonSchemaSampledField<ArrayType>}
				path={path}
				metadata={metadata}
			/>
		);
	}

	if (type === FieldCategory.Value) {
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
