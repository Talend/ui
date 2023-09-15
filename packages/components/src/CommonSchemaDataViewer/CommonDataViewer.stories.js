import { CommonDataViewer } from './CommonDataViewer.component';
import { mockDonutsRecords } from './mock-data/mock-donuts-records';
import { mockDonutsMetadata } from './mock-data/mock-donuts-metadata';
import { mockDonutsSchema } from './mock-data/mock-donuts-schema';
import { mockEmployeesSchema } from './mock-data/mock-employees-schema';
import { mockEmployeesMetadata } from './mock-data/mock-employees-metadata';
import { mockEmployeesRecords } from './mock-data/mock-employees-records';
import { mockWidgetRecords } from './mock-data/mock-widget-records';
import { mockWidgetMetadata } from './mock-data/mock-widget-metadata';
import { mockWidgetSchema } from './mock-data/mock-widget-schema';

export default {
	title: 'Components/Tree/CommonDataViewer',
};

export const DataViewerWithWidget = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer
				records={mockWidgetRecords}
				metadata={mockWidgetMetadata}
				schema={mockWidgetSchema}
			/>
		</div>
	);
};

export const DataViewerWithWidgetWithoutMetadata = () => {
	return (
		<div style={{ height: '80vh' }}>
			<CommonDataViewer records={mockWidgetRecords} schema={mockWidgetSchema} />
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
