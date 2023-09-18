import { useContext } from 'react';

import classNames from 'classnames';

import { StackHorizontal } from '@talend/design-system';

import { SampleLeaf } from '../CommonDataViewer.types';
import { DataModelDivider } from '../DataModel/DataModelDivider.component';
import { TreeManagerContext } from '../TreeManagerContext';

import theme from './Records.module.scss';

export type RecordLeafProps = {
	leaf: SampleLeaf;
	path: string[];
};

export function RecordLeaf({ leaf, path }: RecordLeafProps) {
	const { isHighlightedPath } = useContext(TreeManagerContext);
	const fieldPath = [...path, leaf.name];
	const isHighlighted = isHighlightedPath(fieldPath.slice(1));

	console.log('RecordLeaf', leaf, path, fieldPath, isHighlighted);

	return (
		<div className={classNames(theme['record-item'], { [theme.selected]: isHighlighted })}>
			<StackHorizontal noGrow gap="XS" align="center">
				<DataModelDivider path={path} />
				<span className={theme['record-item__name']}>{leaf.name} :</span>
				<span className={theme['record-item__value']}>{leaf.value}</span>
			</StackHorizontal>
		</div>
	);
}
