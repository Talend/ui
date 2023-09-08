import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import { FieldMetadata, RecordType } from '../CommonDataViewer.types';
import { DataViewerDivider } from '../DataViewerDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { renderField } from './CommonModel.utils';

type ModelRecordFieldProps = {
	field: RecordType;
	path: string[];
	metadata?: FieldMetadata[];
};

export function ModelRecordField({ field, path, metadata }: ModelRecordFieldProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { isPathExpanded, togglePath } = useContext(TreeManagerContext);
	const fieldPath = [...path, 'record'];

	const isCurrentPathExpanded = isPathExpanded(fieldPath.join('.'));

	return (
		<StackVertical gap={0} noGrow>
			<StackHorizontal noGrow gap="XS" align="center">
				<DataViewerDivider path={path} />
				<ButtonIcon
					size="XS"
					icon={isCurrentPathExpanded ? 'chevron-down' : 'chevron-right'}
					onClick={() => togglePath(fieldPath.join('.'))}
				>
					{isCurrentPathExpanded
						? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
						: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
				</ButtonIcon>
				{t('MODEL_VIEWER_RECORD', 'Object')}
			</StackHorizontal>
			{isCurrentPathExpanded
				? field.fields?.map(item => renderField(item, fieldPath, metadata))
				: null}
		</StackVertical>
	);
}
