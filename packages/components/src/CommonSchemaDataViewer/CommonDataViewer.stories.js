import { mockRecords } from './mock-data/mock-common-records';
import { mockMetadata } from './mock-data/mock-metadata';

import { CommonDataViewer } from './CommonDataViewer.component';
import { mockSchema2 } from './mock-data/mock-common-schema2';
import { mockDonutsRecords } from './mock-data/mock-donuts-records';
import { mockDonutsMetadata } from './mock-data/mock-donuts-metadata';
import { mockDonutsSchema } from './mock-data/mock-donuts-schema';
import { mockEmployeesSchema } from './mock-data/mock-employees-schema';
import { mockEmployeesMetadata } from './mock-data/mock-employees-metadata';
import { mockEmployeesRecords } from './mock-data/mock-employees-records';

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

export const DataViewerWithDonuts = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer
				records={mockDonutsRecords}
				metadata={mockDonutsMetadata}
				schema={mockDonutsSchema}
			/>
		</div>
	);
};

export const DataViewerWithEmployees = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer
				records={mockEmployeesRecords}
				metadata={mockEmployeesMetadata}
				schema={mockEmployeesSchema}
			/>
		</div>
	);
};
