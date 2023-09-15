import { StackHorizontal } from '@talend/design-system';

import { SampleLeaf } from '../CommonDataViewer.types';
import { DataModelDivider } from '../DataModel/DataModelDivider.component';

import theme from './Records.module.scss';

export type RecordLeafProps = {
	leaf: SampleLeaf;
	path: string[];
};

export function RecordLeaf({ leaf, path }: RecordLeafProps) {
	return (
		<div className={theme['record-item']}>
			<StackHorizontal noGrow gap="XS" align="center">
				<DataModelDivider path={path} />
				<span className={theme['record-item__name']}>{leaf.name} :</span>
				<span className={theme['record-item__value']}>{leaf.value}</span>
			</StackHorizontal>
		</div>
	);
}
