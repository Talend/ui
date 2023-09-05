import { CommonSchemaSampledField, CommonSchemaSampledFieldType } from '../CommonDataViewer.types';
import { ModelArrayField } from './ModelArrayField.component';
import { ModelRecordField } from './ModelRecordField.component';
import { ModelValueField } from './ModelValueField.component';

enum FieldTypes {
	Record = 'record',
	Array = 'array',
	Value = 'value',
}

function getFieldType(field: CommonSchemaSampledField): FieldTypes {
	let fieldCommonType: CommonSchemaSampledFieldType;

	if (Array.isArray(field.type)) {
		fieldCommonType = field.type.find(type => type !== 'null') as CommonSchemaSampledFieldType;
	} else {
		fieldCommonType = field.type;
	}

	if (fieldCommonType.type === 'record') {
		return FieldTypes.Record;
	} else if (fieldCommonType.type === 'array') {
		return FieldTypes.Array;
	}
	return FieldTypes.Value;
}

export function renderField(field: CommonSchemaSampledField) {
	const type = getFieldType(field);

	if (type === FieldTypes.Record) {
		return <ModelRecordField />;
	}

	if (type === FieldTypes.Array) {
		return <ModelArrayField />;
	}

	if (type === FieldTypes.Value) {
		return <ModelValueField />;
	}

	return null;
}
