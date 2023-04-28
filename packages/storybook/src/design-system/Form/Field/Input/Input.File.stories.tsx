import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.File,
};

export const File = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.File name="file" label="File" />
		<Form.File name="file" label="File disabled" disabled />
		<Form.File name="file" label="File read-only" readOnly />
		<Form.File name="file" label="File filled" files={['filename.xlsx']} />
		<Form.File name="file" label="File filled disabled" files={['filename.xlsx']} disabled />
		<Form.File name="file" label="File filled read-only" files={['filename.xlsx']} readOnly />
	</StackVertical>
);

export const FileMultiple = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.File name="file" multiple label="File multiple" />
		<Form.File name="file" multiple label="File multiple disabled" disabled />
		<Form.File name="file" multiple label="File multiple read-only" readOnly />
		<Form.File
			name="file"
			multiple
			label="File multiple filled"
			files={['filename.xlsx', 'filename2.xlsx']}
		/>
		<Form.File
			name="file"
			multiple
			label="File multiple filled disabled"
			files={['filename.xlsx', 'filename2.xlsx']}
			disabled
		/>
		<Form.File
			name="file"
			multiple
			label="File multiple filled read-only"
			files={['filename.xlsx', 'filename2.xlsx']}
			readOnly
		/>
	</StackVertical>
);

export const FileError = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.File name="file" label="File error" hasError description="This field is required" />
		<Form.File
			name="file"
			label="File filled error"
			files={['filename.xlsx']}
			hasError
			description="File extension should be .pdf"
		/>
		<Form.File
			name="file"
			multiple
			label="File multiple error"
			hasError
			description="This field is required"
		/>
		<Form.File
			name="file"
			multiple
			label="File multiple filled error"
			files={['filename.xlsx', 'filename2.xlsx']}
			hasError
			description="3 files are necessary"
		/>
	</StackVertical>
);
