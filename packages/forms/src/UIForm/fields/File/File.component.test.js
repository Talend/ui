import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import File, { base64Decode, FileWidget } from './File.component';

jest.unmock('@talend/design-system');

describe('File field', () => {
	const schema = {
		autoFocus: false,
		description: 'This is the file field',
		placeholder: 'Select a file to upload',
		disabled: false,
		readOnly: false,
		title: 'Upload file',
	};

	const props = {
		id: 'my-file-field',
		required: false,
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		schema,
		value: '',
	};

	const propsWithPresignedUrlTrigger = {
		...props,
		onTrigger: jest.fn(),
		schema: {
			...props.schema,
			triggers: [
				{
					action: 'generatePresignedURL',
					family: 'LocalStorage',
					type: 'presignedURL',
					parameters: [
						{ path: 'configuration.datastore.$selfReference', key: 'datastore.$selfReference' },
						{ path: 'configuration.pathStyleAccess', key: 'pathStyleAccess' },
						{ path: '$remoteEngineId', key: '$remoteEngineId' },
					],
					onEvent: 'change',
				},
			],
		},
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should render default File', () => {
		// when
		const { container } = render(<File {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render File with data', () => {
		// given
		const valuedProps = {
			...props,
			value: 'data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0i',
		};

		// when
		render(<File {...valuedProps} />);

		// then
		expect(screen.getByLabelText(schema.title)).toHaveAttribute('files', 'test.xml');
	});

	it('should render File with pre-signed url related trigger', () => {
		// given
		const valuedProps = {
			...propsWithPresignedUrlTrigger,
			value: '93843640-ed30-4174-898b-69499da9e679.Ni5hdnJv',
		};

		// when
		render(<File {...valuedProps} />);

		// then
		expect(screen.getByLabelText(schema.title)).toHaveAttribute('files', '6.avro');
	});

	it('should trigger onChange when user select file', async () => {
		// given
		// jest.useFakeTimers();
		render(<File {...props} />);

		const testContent = { test: 'content' };
		const blob = new Blob([JSON.stringify(testContent, null, 2)], {
			type: 'application/json',
			name: 'test.json',
		});
		const value = 'data:application/json;name=;base64,ewogICJ0ZXN0IjogImNvbnRlbnQiCn0=';

		// when
		const fileInput = document.querySelector('input[type="file"]');
		await userEvent.upload(fileInput, blob);
		await waitFor(() =>
			expect(props.onChange).toHaveBeenCalledWith(expect.anything(), { schema, value }),
		);
	});

	it('should trigger pre-signed url related onChange when user select file', async () => {
		// given
		render(<File {...propsWithPresignedUrlTrigger} />);
		const testContent = { test: 'content' };
		const blob = new Blob([JSON.stringify(testContent, null, 2)], {
			type: 'application/json',
			name: 'test.json',
		});

		// when
		const fileInput = document.querySelector('input[type="file"]');
		await userEvent.upload(fileInput, blob);

		await waitFor(() =>
			expect(propsWithPresignedUrlTrigger.onTrigger).toHaveBeenCalledWith(expect.anything(), {
				schema: propsWithPresignedUrlTrigger.schema,
				trigger: propsWithPresignedUrlTrigger.schema.triggers[0],
			}),
		);
	});

	it('should change input content when props are updated', () => {
		// given
		const valuedProps = {
			...props,
			value: 'data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0i',
		};

		// when
		const { rerender } = render(<FileWidget {...valuedProps} />);

		// then state and text field contains 'test.xml'
		expect(screen.getByLabelText(schema.title)).toHaveAttribute('files', 'test.xml');

		// when
		rerender(<FileWidget {...valuedProps} value="" />);

		// then state and text field contains ''
		expect(screen.getByLabelText(schema.title)).toHaveAttribute('files', '');
	});

	it('should change input content when props are updated with pre-signed url related trigger', () => {
		// given
		const valuedProps = {
			...propsWithPresignedUrlTrigger,
			value: '93843640-ed30-4174-898b-69499da9e679.Ni5hdnJv',
		};

		// when
		const { rerender } = render(<FileWidget {...valuedProps} />);

		// then state and text field contains '6.avro'
		expect(screen.getByLabelText(schema.title)).toHaveAttribute('files', '6.avro');

		// when
		rerender(<FileWidget {...valuedProps} value="" />);

		// then state and text field contains ''
		expect(screen.getByLabelText(schema.title)).toHaveAttribute('files', '');
	});

	it('should base64 encode single and multi-byte strings', () => {
		expect(base64Decode('Y3LDqG1lLnhsc3g=')).toBe('crème.xlsx');
		expect(base64Decode('Y3JlYW0ueGxzeA==')).toBe('cream.xlsx');
		expect(base64Decode('Y3JlYW0tYW5kLXN1Z2FyLnhsc3g=')).toBe('cream-and-sugar.xlsx');
	});
});
