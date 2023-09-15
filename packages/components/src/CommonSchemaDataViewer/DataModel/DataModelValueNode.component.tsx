import { StackHorizontal } from '@talend/design-system';

//eslint-disable-next-line
import Clickable from '@talend/design-system/lib/components/Clickable';
import { useContext } from 'react';
import { CommonSchemaSampledField, FieldMetadata, ValueType } from '../CommonDataViewer.types';
import { DataModelDivider } from './DataModelDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { DataModelDqType } from './DataModelDqType.component';
import theme from './DataModelNode.module.scss';
import classNames from 'classnames';
import { QualityBar } from '../../QualityBar';
import { getFieldType, isFieldNullable } from './DataModel.utils';

type DataModelValueNodeProps = {
	field: CommonSchemaSampledField<ValueType>;
	path: string[];
	metadata?: FieldMetadata[];
};

export function DataModelValueNode({ field, path, metadata }: DataModelValueNodeProps) {
	const fieldPath = [...path, field.name];
	const { setHighlightedPath, isHighlightedPath } = useContext(TreeManagerContext);
	const type = getFieldType(field);
	const isNullable = isFieldNullable(field);

	const fieldAggregatedMetadata = metadata?.find(m => m.path === fieldPath.join('.'))?.qualities
		.aggregated;

	return (
		<StackHorizontal noGrow gap="XS" align="center" isFullWidth>
			<DataModelDivider path={path} />
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
						<DataModelDqType label={type.dqType || type.type} />

						{fieldAggregatedMetadata ? (
							<div className={theme['model-field-quality']}>
								<QualityBar
									valid={fieldAggregatedMetadata.valid || 0}
									invalid={fieldAggregatedMetadata.invalid || 0}
									empty={fieldAggregatedMetadata.empty || 0}
								/>
							</div>
						) : null}
					</StackHorizontal>
				</div>
			</Clickable>
		</StackHorizontal>
	);
}
