import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { SampleHierarchicalRow } from '../CommonDataViewer.types';
import { DataModelDivider } from '../DataModel/DataModelDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { renderRecordNode } from './RecordRow.utils';

type RecordRowProps = {
	index: number;
	row: SampleHierarchicalRow;
	path?: string[];
};

export function RecordRow({ row, index, path }: RecordRowProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { toggleRecordPath } = useContext(TreeManagerContext);
	const fieldPath = path ? [...path] : [index.toString()];
	const isCurrentPathExpanded = false;

	return (
		<StackHorizontal noGrow gap="XS" align="center" isFullWidth>
			{path ? <DataModelDivider path={fieldPath} /> : null}

			<StackVertical gap={0}>
				<StackHorizontal gap="S" align="center">
					<ButtonIcon
						size="XS"
						icon={isCurrentPathExpanded ? 'minus-stroke' : 'plus-stroke'}
						onClick={() => toggleRecordPath(fieldPath)}
					>
						{isCurrentPathExpanded
							? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
							: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
					</ButtonIcon>
					{index}
				</StackHorizontal>
				{row.fields.map(field => renderRecordNode(field, fieldPath))}
			</StackVertical>
		</StackHorizontal>
	);
}
