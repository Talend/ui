import { StackHorizontal, StackVertical } from '@talend/design-system';
import { CommonSchemaSampledField, FieldMetadata, ValueType } from '../CommonDataViewer.types';
import { DataViewerDivider } from '../DataViewerDivider.component';

type ModelValueFieldProps = {
	field: CommonSchemaSampledField<ValueType>;
	path: string[];
	metadata?: FieldMetadata[];
};

export function ModelValueField({ field, path, metadata }: ModelValueFieldProps) {
	// const fieldPath = [...path, field.name];

	return (
		<StackHorizontal noGrow gap="XS" align="center">
			<DataViewerDivider path={path} />
			<div>{field.name}</div>
			{/* {field.type} */}
		</StackHorizontal>
	);
}
