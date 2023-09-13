import { CommonSchemaSampledField, CommonSchemaSampledFieldType } from './CommonDataViewer.types';

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
