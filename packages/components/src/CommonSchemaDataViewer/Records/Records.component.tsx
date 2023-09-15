import { useTranslation } from 'react-i18next';

import { Divider } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { HierarchicalSample } from '../CommonDataViewer.types';
import { RecordRow } from './RecordRow.component';
import { VirtualizedRecordTree } from './VirtualizedRecordTree.component';

import theme from './Records.module.scss';

type RecordsProps = {
	records: HierarchicalSample;
};

export function Records({ records }: RecordsProps) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	return (
		<div className={theme['tc-common-records']}>
			<header className={theme['tc-common-records_header']}>
				{t('RECORD_VIEWER_HEADER_TITLE', 'Records')}
			</header>
			<Divider />
			{/* <div style={{ overflow: 'auto' }}> */}
			<VirtualizedRecordTree
				onVerticalScroll={() => {}}
				renderNode={({ index, measure }) => <RecordRow index={index} row={records[index]} />}
				rowCount={records.length}
			/>
		</div>
	);
}
