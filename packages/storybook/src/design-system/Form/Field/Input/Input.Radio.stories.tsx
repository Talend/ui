import { useState } from 'react';
import {
	ButtonPrimary,
	Form,
	InlineMessageInformation,
	StackVertical,
} from '@talend/design-system';
import { useForm } from 'react-hook-form';

export default {
	component: Form.Radio,
};

export const RadioFillStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Radio name="radio-one" value="option-a" label="Radio" />
		<Form.Radio name="radio-one" value="option-b" label="Checked Radio" defaultChecked />
	</StackVertical>
);

export const RadioFillStatesDisabled = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Radio name="radio-two" value="option-a" label="Radio" disabled />
		<Form.Radio name="radio-two" value="option-b" label="Checked Radio" defaultChecked disabled />
	</StackVertical>
);

export const RadioFillStatesReadonly = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Radio name="radio-three" value="option-a" label="Radio" readOnly />
		<Form.Radio name="radio-three" value="option-b" label="Checked Radio" defaultChecked readOnly />
	</StackVertical>
);

type Inputs = {
	option?: string;
	'inline-option'?: string;
	'readonly-option'?: string;
	'disabled-inline-option'?: string;
};

export const ReactHooksForm = () => {
	const { register, handleSubmit } = useForm<Inputs>();
	const [formData, setFormData] = useState<null | Inputs>();
	return (
		<Form onSubmit={handleSubmit(setFormData)}>
			{formData && (
				<InlineMessageInformation
					title={'Form data'}
					description={JSON.stringify(formData, null, 2)}
					withBackground
				/>
			)}
			<Form.Fieldset legend="Pick one option" required>
				<Form.Radio label="Option A" value="option-a" name="option" ref={register()} />
				<Form.Radio
					label="Option B"
					value="option-b"
					defaultChecked
					name="option"
					ref={register()}
				/>
			</Form.Fieldset>
			<Form.Fieldset legend="Pick one inline option" required>
				<Form.Row>
					<Form.Radio
						label="Inline option A"
						value="option-a"
						name="inline-option"
						ref={register()}
					/>
					<Form.Radio
						label="Inline option B"
						value="option-b"
						defaultChecked
						name="inline-option"
						ref={register()}
					/>
				</Form.Row>
			</Form.Fieldset>
			<Form.Fieldset legend="Read only are sent" required readOnly>
				<Form.Radio label="Option C" value="option-c" name="readonly-option" ref={register()} />
				<Form.Radio
					label="Option D"
					value="option-d"
					checked
					name="readonly-option"
					ref={register()}
				/>
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled are not sent" required disabled>
				<Form.Radio
					label="Option E"
					value="option-e"
					name="disabled-inline-option"
					disabled
					ref={register()}
				/>
				<Form.Radio
					label="Option F"
					value="option-f"
					checked
					name="disabled-inline-option"
					disabled
					ref={register()}
				/>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary onClick={() => {}} type="submit">
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};
