import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { TFunction } from 'i18next';

import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import {
	ArrayType,
	CommonSchemaSampledField,
	CommonSchemaSampledFieldType,
	FieldMetadata,
	RecordType,
} from '../CommonDataViewer.types';
import { TreeManagerContext } from '../TreeManagerContext';
import {
	FieldCategory,
	getFieldType,
	getModelNodeCategory,
	renderModelNode,
} from './DataModel.utils';
import { DataModelDivider } from './DataModelDivider.component';
import { DataModelDqType } from './DataModelDqType.component';

import theme from './DataModelNode.module.scss';

type DataModelArrayNodeProps = {
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
		return t('MODEL_VIEWER_ARRAY_VALUE', {
			defaultValue: '{{type}} []',
			type: arrayComposedBy?.type,
		});
	}

	if (category === FieldCategory.Record) {
		return t('MODEL_VIEWER_ARRAY_RECORD', 'Object []');
	}
	return '';
}

export function DataModelArrayNode({ field, path, metadata }: DataModelArrayNodeProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { isModelPathClosed, toggleModelPath } = useContext(TreeManagerContext);
	const fieldPath = [...path, field.name];

	const isCurrentPathExpanded = !isModelPathClosed(fieldPath);
	const arrayType = getFieldType<ArrayType>(field);
	const arrayComposedBy = arrayType.items
		.filter((item): item is CommonSchemaSampledFieldType => item !== 'null')
		.find(() => true);

	const category = arrayComposedBy && getModelNodeCategory(arrayComposedBy);

	return (
		<div className={theme['model-array-field']}>
			<StackVertical gap={0} noGrow>
				<div className={theme['model-array-field-name']}>
					<StackHorizontal noGrow gap="XS" align="center">
						<DataModelDivider path={path} />
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
							<DataModelDqType label={getArrayCompositionLabel(category, arrayComposedBy, t)} />
						</StackHorizontal>
					</StackHorizontal>
				</div>
				{category && isCurrentPathExpanded && category === FieldCategory.Record
					? (arrayComposedBy as RecordType).fields.map(item =>
							renderModelNode(item, fieldPath, metadata),
					  )
					: null}
			</StackVertical>
		</div>
	);
}
