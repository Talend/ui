import { StackHorizontal } from '@talend/design-system';

//eslint-disable-next-line
import Clickable from '@talend/design-system/lib/components/Clickable';
import { useContext } from 'react';
import { CommonSchemaSampledField, FieldMetadata, ValueType } from '../CommonDataViewer.types';
import { getFieldType, isFieldNullable } from '../CommonDataViewer.utils';
import { DataViewerDivider } from './DataViewerDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { ModelDQType } from './ModelDqType.component';
import theme from './ModelField.module.scss';
import classNames from 'classnames';

type ModelValueFieldProps = {
	field: CommonSchemaSampledField<ValueType>;
	path: string[];
	metadata?: FieldMetadata[];
};

export function ModelValueField({ field, path, metadata }: ModelValueFieldProps) {
	const fieldPath = [...path, field.name];
	const { setHighlightedPath, isHighlightedPath } = useContext(TreeManagerContext);
	const type = getFieldType(field);
	const isNullable = isFieldNullable(field);

	console.log(fieldPath, metadata);

	return (
		<StackHorizontal noGrow gap="XS" align="center" isFullWidth>
			<DataViewerDivider path={path} />
			<Clickable
				type="button"
				onClick={() => setHighlightedPath(fieldPath)}
				className={theme['model-field-button']}
			>
				<div
					className={classNames(theme['model-field-clickable'], {
						[theme.selected]: isHighlightedPath(fieldPath),
					})}
				>
					<StackHorizontal
						noGrow
						isFullWidth
						gap="XS"
						align="center"
						padding={{ top: 'XXS', bottom: 'XXS', left: 'XXS', right: 0 }}
					>
						<div>
							{field.name}
							{isNullable ? null : '*'}
						</div>
						<ModelDQType label={type.dqType || type.type} />
					</StackHorizontal>
				</div>
			</Clickable>
		</StackHorizontal>
	);
}
