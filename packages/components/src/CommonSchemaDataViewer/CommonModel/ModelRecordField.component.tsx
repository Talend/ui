import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import { CommonSchemaSampledField, FieldMetadata, RecordType } from '../CommonDataViewer.types';
import { DataViewerDivider } from './DataViewerDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { renderField } from './CommonModel.utils';

import theme from './ModelField.module.scss';

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

type ModelRecordFieldProps = ModelRecordWithType | ModelRecordWithField;

function getFieldRecordType(field?: CommonSchemaSampledField<RecordType>) {
	if (!field) {
		return null;
	}

	if (Array.isArray(field.type)) {
		return field.type.find(item => item !== 'null') as RecordType;
	}
	return field.type;
}

export function ModelRecordField({ field, path, metadata, type }: ModelRecordFieldProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { isModelPathClosed, toggleModelPath } = useContext(TreeManagerContext);
	const nodeName = field?.name || 'record';

	const fieldPath = [...path, nodeName];
	const isCurrentPathExpanded = !isModelPathClosed(fieldPath);

	const currentType = getFieldRecordType(field) || type;

	return (
		<div className={theme['model-record-field']}>
			<StackVertical gap={0} noGrow>
				<StackHorizontal noGrow gap="XS" align="center">
					<DataViewerDivider path={path} />
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
				{isCurrentPathExpanded
					? currentType?.fields?.map(item => renderField(item, fieldPath, metadata))
					: null}
			</StackVertical>
		</div>
	);
}
