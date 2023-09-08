import { mockRecords } from './mock-data/mock-common-records';
import { mockSchema } from './mock-data/mock-common-schema';
import { mockMetadata } from './mock-data/mock-metadata';

import { CommonDataViewer } from './CommonDataViewer.component';
import { mockSchema2 } from './mock-data/mock-common-schema2';

export default {
	title: 'Components/Tree/CommonDataViewer',
};

export const CommonDataViewerWithoutSchema = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer records={mockRecords} />
		</div>
	);
};

export const DataViewerWithOtherSchema = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer records={mockRecords} metadata={mockMetadata} schema={mockSchema2} />
		</div>
	);
};

export const DataViewerWithCommonSchema = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer records={mockRecords} metadata={mockMetadata} schema={mockSchema} />
		</div>
	);
};
