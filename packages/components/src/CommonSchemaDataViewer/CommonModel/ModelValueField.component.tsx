import { StackHorizontal } from '@talend/design-system';

//eslint-disable-next-line
import Clickable from '@talend/design-system/lib/components/Clickable';
import { useContext } from 'react';
import { CommonSchemaSampledField, FieldMetadata, ValueType } from '../CommonDataViewer.types';
import { getFieldType, isFieldNullable } from '../CommonDataViewer.utils';
import { DataViewerDivider } from '../DataViewerDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import theme from './ModelField.module.scss';

type ModelValueFieldProps = {
	field: CommonSchemaSampledField<ValueType>;
	path: string[];
	metadata?: FieldMetadata[];
};

export function ModelValueField({ field, path, metadata }: ModelValueFieldProps) {
	const fieldPath = [...path, field.name];
	const { hasSemanticAwareness, setHighlightedPath, highlightedPath } =
		useContext(TreeManagerContext);
	const type = getFieldType(field);
	const isNullable = isFieldNullable(field);

	return (
		<StackHorizontal noGrow gap="XS" align="center">
			<DataViewerDivider path={path} />
			<Clickable type="button" onClick={() => setHighlightedPath(fieldPath)}>
				<div className={theme['model-field-clickable']}>
					<StackHorizontal noGrow gap="XS" align="center">
						<div>
							{field.name}
							{isNullable ? null : '*'}
						</div>
						{hasSemanticAwareness ? `: (${type.dqType || type.type})` : null}
					</StackHorizontal>
				</div>
			</Clickable>
		</StackHorizontal>
	);
}
