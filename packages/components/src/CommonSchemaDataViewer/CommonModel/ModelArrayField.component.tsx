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
import { DataViewerDivider } from '../DataViewerDivider.component';
import { getFieldType } from '../CommonDataViewer.utils';
import { TreeManagerContext } from '../TreeManagerContext';
import { FieldCategory, getFieldCategory, renderField } from './CommonModel.utils';
import { TFunction } from 'i18next';

type ModelArrayFieldProps = {
	field: CommonSchemaSampledField<ArrayType>;
	path: string[];
	metadata?: FieldMetadata[];
};

function getArrayCompositionLabel(
	arrayComposedBy: CommonSchemaSampledFieldType | undefined,
	t: TFunction,
) {
	if (!arrayComposedBy) {
		return '';
	}

	if (arrayComposedBy.type === 'record') {
		// return `- (${t('MODEL_VIEWER_ARRAY_RECORD', 'Array of records')})`;
		return `- (${t('MODEL_VIEWER_ARRAY_RECORD', 'Array')})`;
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
		<StackVertical gap={0} noGrow>
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
					{field.name} {getArrayCompositionLabel(arrayComposedBy, t)}
				</StackHorizontal>
			</StackHorizontal>
			{/* {category && isCurrentPathExpanded
				? (arrayComposedBy as RecordType).fields.map(item => renderField(item, fieldPath, metadata))
				: null} */}
			{isCurrentPathExpanded
				? arrayType.items
						.filter((item): item is CommonSchemaSampledFieldType => item !== 'null')
						.map(item => renderField(item, fieldPath, metadata))
				: null}
		</StackVertical>
	);
}
