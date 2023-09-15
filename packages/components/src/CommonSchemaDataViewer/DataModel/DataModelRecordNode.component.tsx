import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { CommonSchemaSampledField, FieldMetadata, RecordType } from '../CommonDataViewer.types';
import { TreeManagerContext } from '../TreeManagerContext';
import { renderModelNode } from './DataModel.utils';
import { DataModelDivider } from './DataModelDivider.component';

import theme from './DataModelNode.module.scss';

type ModelRecordWithType = {
	field?: never;
	type: RecordType;
	path: string[];
	metadata?: FieldMetadata[];
};

type ModelRecordWithField = {
	field: CommonSchemaSampledField<RecordType>;
	type?: never;
	path: string[];
	metadata?: FieldMetadata[];
};

type DataModelRecordNodeProps = ModelRecordWithType | ModelRecordWithField;

function getFieldRecordType(field?: CommonSchemaSampledField<RecordType>) {
	if (!field) {
		return null;
	}

	if (Array.isArray(field.type)) {
		return field.type.find(item => item !== 'null') as RecordType;
	}
	return field.type;
}

export function DataModelRecordNode({ field, path, metadata, type }: DataModelRecordNodeProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { isModelPathClosed, toggleModelPath } = useContext(TreeManagerContext);
	const nodeName = field?.name || 'record';

	const fieldPath = [...path, nodeName];
	const isCurrentPathExpanded = !isModelPathClosed(fieldPath);

	const currentType = getFieldRecordType(field) || type;

	return (
		<div className={theme['model-record-field']}>
			<StackVertical gap={0} noGrow>
				<div className={theme['model-record-field-name']}>
					<StackHorizontal noGrow gap="XS" align="center">
						<DataModelDivider path={path} />
						<ButtonIcon
							size="XS"
							icon={isCurrentPathExpanded ? 'minus-stroke' : 'plus-stroke'}
							onClick={() => toggleModelPath(fieldPath)}
						>
							{isCurrentPathExpanded
								? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
								: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
						</ButtonIcon>
						{field?.name || t('MODEL_VIEWER_RECORD', 'Object')}
					</StackHorizontal>
				</div>
				{isCurrentPathExpanded
					? currentType?.fields?.map(item => renderModelNode(item, fieldPath, metadata))
					: null}
			</StackVertical>
		</div>
	);
}
