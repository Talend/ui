import { useTranslation } from 'react-i18next';

import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { SampleHierarchicalRow } from '../CommonDataViewer.types';
import { renderRecordNode } from './RecordRow.utils';

type RecordRowProps = {
	index: number;
	row: SampleHierarchicalRow;
};

export function RecordRow({ row, index }: RecordRowProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const fieldPath = [index.toString()];
	const isCurrentPathExpanded = false;
	const toggleModelPath = (path: string[]) => {};

	return (
		<StackVertical gap={0} noGrow>
			<StackHorizontal gap="S" align="center">
				<ButtonIcon
					size="XS"
					icon={isCurrentPathExpanded ? 'minus-stroke' : 'plus-stroke'}
					onClick={() => toggleModelPath(fieldPath)}
				>
					{isCurrentPathExpanded
						? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
						: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
				</ButtonIcon>
				{index}
			</StackHorizontal>
			{row.fields.map(field => renderRecordNode(field, fieldPath))}
		</StackVertical>
	);
}
