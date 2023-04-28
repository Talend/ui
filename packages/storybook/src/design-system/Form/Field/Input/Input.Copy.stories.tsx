import { useState, useEffect } from 'react';
import {
	ButtonPrimary,
	ButtonTertiary,
	Form,
	InlineMessageInformation,
	StackVertical,
} from '@talend/design-system';
import { useForm } from 'react-hook-form';

export default {
	component: Form.Copy,
};

export const CopyStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Copy name="copy" label="Copy field" />
		<Form.Copy name="copy" label="Copy field disabled" disabled />
		<Form.Copy name="copy" label="Copy field read-only" readOnly />
	</StackVertical>
);

export const CopyStatesWithContents = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Copy defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5" name="copy" label="Copy field" />
		<Form.Copy
			defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5"
			name="copy"
			label="Copy field disabled"
			disabled
		/>
		<Form.Copy
			defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5"
			name="copy"
			label="Copy field read-only"
			readOnly
		/>
	</StackVertical>
);

export const CopyWithPrefix = () => (
	<Form.Copy
		defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5"
		name="copy"
		label="Copy field"
		prefix="uuid"
	/>
);

type CopyFormData = {
	apiKey?: string;
};

export const ReactHookForm = () => {
	const getUUID = () =>
		`${[1e7]}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, c => {
			const convertedC = parseInt(c);
			return (
				convertedC ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (convertedC / 4)))
			).toString(16);
		});
	const { register, handleSubmit, setValue, watch } = useForm<CopyFormData>();
	const [formData, setFormData] = useState<null | CopyFormData>();
	const inputValue = watch('apiKey');

	useEffect(() => {
		setFormData(null);
	}, [inputValue, setFormData]);

	return (
		<Form onSubmit={handleSubmit(setFormData)}>
			{formData && (
				<InlineMessageInformation
					title={'Form data'}
					description={JSON.stringify(formData, null, 2)}
					withBackground
				/>
			)}
			<Form.Row>
				<Form.Copy
					hideLabel
					label={'Key'}
					defaultValue="10ca0868-1010-4b4a-a2cc-ff737527a7b5"
					description={'This information is displayed only once.'}
					name="apiKey"
					value={inputValue}
					ref={register()}
				/>
				<ButtonTertiary icon="talend-refresh" onClick={() => setValue('apiKey', getUUID())}>
					Regenerate
				</ButtonTertiary>
			</Form.Row>
			<Form.Buttons>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};
