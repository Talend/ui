import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { ButtonIcon, StackHorizontal, StackVertical, Tag } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { SampleNode } from '../CommonDataViewer.types';
import { DataModelDivider } from '../DataModel/DataModelDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';
import { renderRecordNode } from './RecordRow.utils';

import theme from './Records.module.scss';

export type RecordNodeProps = {
	node: SampleNode;
	path: string[];
};

export function RecordNode({ node, path }: RecordNodeProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const { toggleRecordPath, isRecordPathOpened } = useContext(TreeManagerContext);
	const fieldPath = [...path, node.name];

	const isCurrentPathExpanded = isRecordPathOpened(fieldPath);

	return (
		<div className={classNames(theme['record-item'])}>
			<StackVertical gap={0} noGrow>
				<StackHorizontal noGrow gap="XS" align="center">
					<DataModelDivider path={path} />
					<ButtonIcon
						size="XS"
						icon={isCurrentPathExpanded ? 'minus-stroke' : 'plus-stroke'}
						onClick={() => toggleRecordPath(fieldPath)}
					>
						{isCurrentPathExpanded
							? t('MODEL_VIEWER_COLLAPSE_NODE', 'Collapse')
							: t('MODEL_VIEWER_EXPAND_NODE', 'Expand')}
					</ButtonIcon>
					{node.name}
					<Tag>{node.fields.length}</Tag>
				</StackHorizontal>
				{isCurrentPathExpanded &&
					node.fields.map((item, index) => renderRecordNode(item, fieldPath, index))}
			</StackVertical>
		</div>
	);
}
