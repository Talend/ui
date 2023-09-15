import { Divider, StackHorizontal } from '@talend/design-system';

import { CommonSchemaSampled, FieldMetadata, HierarchicalSample } from './CommonDataViewer.types';
import { DataModel } from './DataModel';
import { Records } from './Records';
import { TreeManagerContextProvider } from './TreeManagerContext';

type CommonDataViewerProps = {
	metadata?: FieldMetadata[];
	records: HierarchicalSample;
	schema?: CommonSchemaSampled;
};

export function CommonDataViewer({ records, metadata, schema }: CommonDataViewerProps) {
	return (
		<TreeManagerContextProvider>
			<div style={{ display: 'flex', height: '100%' }}>
				<StackHorizontal gap={0}>
					{schema ? <DataModel metadata={metadata} schema={schema} /> : null}
					<Divider orientation="vertical" />
					<Records records={records} />
				</StackHorizontal>
			</div>
		</TreeManagerContextProvider>
	);
}
