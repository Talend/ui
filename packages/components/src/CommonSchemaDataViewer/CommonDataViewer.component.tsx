import { StackHorizontal } from '@talend/design-system';
import { CommonSchemaSampled, FieldMetadata, HierarchicalSample } from './CommonDataViewer.types';
import { CommonModel } from './CommonModel';
import { CommonRecords } from './CommonRecords';
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
					{schema ? <CommonModel metadata={metadata} schema={schema} /> : null}
					<CommonRecords records={records} />
				</StackHorizontal>
			</div>
		</TreeManagerContextProvider>
	);
}
