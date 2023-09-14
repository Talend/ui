import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import {
	ArrayType,
	CommonSchemaSampledField,
	CommonSchemaSampledFieldType,
	FieldMetadata,
	RecordType,
} from '../CommonDataViewer.types';
import { DataViewerDivider } from './DataViewerDivider.component';
import { getFieldType } from '../CommonDataViewer.utils';
import { TreeManagerContext } from '../TreeManagerContext';
import { FieldCategory, getFieldCategory, renderField } from './CommonModel.utils';
import { TFunction } from 'i18next';

import theme from './ModelField.module.scss';
import { ModelDQType } from './ModelDqType.component';

type ModelArrayFieldProps = {
	field: CommonSchemaSampledField<ArrayType>;
	path: string[];
	metadata?: FieldMetadata[];
};

function getArrayCompositionLabel(
	category: FieldCategory | undefined,
	arrayComposedBy: CommonSchemaSampledFieldType | undefined,
	t: TFunction,
) {
	if (!category) {
		return '';
	}

	if (category === FieldCategory.Value) {
		// return `- (${t('MODEL_VIEWER_ARRAY_VALUE', {
		// 	defaultValue: 'Array of {{type}}',
		// 	type: arrayComposedBy?.type,
		// })})`;
		return t('MODEL_VIEWER_ARRAY_VALUE', {
			defaultValue: '{{type}} []',
			type: arrayComposedBy?.type,
		});
	}

	if (category === FieldCategory.Record) {
		// return `- (${t('MODEL_VIEWER_ARRAY_RECORD', 'Array of records')})`;
		// return `- (${t('MODEL_VIEWER_ARRAY_RECORD', 'Array')})`;
		return t('MODEL_VIEWER_ARRAY_RECORD', 'Object []');
	}
	return '';
}

export function ModelArrayField({ field, path, metadata }: ModelArrayFieldProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { isModelPathClosed, toggleModelPath } = useContext(TreeManagerContext);
	const fieldPath = [...path, field.name];

	const isCurrentPathExpanded = !isModelPathClosed(fieldPath);
	const arrayType = getFieldType<ArrayType>(field);
	const arrayComposedBy = arrayType.items
		.filter((item): item is CommonSchemaSampledFieldType => item !== 'null')
		.find(() => true);

	const category = arrayComposedBy && getFieldCategory(arrayComposedBy);

	return (
		<div className={theme['model-array-field']}>
			<StackVertical gap={0} noGrow>
				<div className={theme['model-array-field-name']}>
					<StackHorizontal noGrow gap="XS" align="center">
						<DataViewerDivider path={path} />
						<StackHorizontal noGrow gap="XS" align="center">
							{category === FieldCategory.Record ? (
								<ButtonIcon
									size="XS"
									icon={isCurrentPathExpanded ? 'chevron-down' : 'chevron-right'}
									onClick={() => toggleModelPath(fieldPath)}
								>
									{isCurrentPathExpanded
										? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
										: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
								</ButtonIcon>
							) : null}
							{field.name}
							<ModelDQType label={getArrayCompositionLabel(category, arrayComposedBy, t)} />
						</StackHorizontal>
					</StackHorizontal>
				</div>
				{category && isCurrentPathExpanded && category === FieldCategory.Record
					? (arrayComposedBy as RecordType).fields.map(item =>
							renderField(item, fieldPath, metadata),
					  )
					: null}
				{/* {isCurrentPathExpanded && category === FieldCategory.Record
				? arrayType.items
						.filter((item): item is CommonSchemaSampledFieldType => item !== 'null')
						.map(item => renderField(item, fieldPath, metadata))
				: null} */}
			</StackVertical>
		</div>
	);
}
