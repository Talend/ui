import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	ButtonPrimary,
	Checkbox,
	Form,
	InlineMessageInformation,
	StackVertical,
	UncontrolledCheckbox,
} from '@talend/design-system';

export default {
	component: Checkbox,
};

export const CheckboxFillStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<UncontrolledCheckbox name="checkbox" label="Checkbox" />
		<UncontrolledCheckbox name="checkbox" label="Indeterminate Checkbox" indeterminate />
		<UncontrolledCheckbox name="checkbox" label="Checked Checkbox" defaultChecked />
	</StackVertical>
);

export const CheckboxFillStatesDisabled = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<UncontrolledCheckbox name="checkbox" label="Checkbox" disabled />
		<UncontrolledCheckbox name="checkbox" label="Indeterminate Checkbox" indeterminate disabled />
		<UncontrolledCheckbox name="checkbox" label="Checked Checkbox" defaultChecked disabled />
	</StackVertical>
);

export const CheckboxFillStatesReadonly = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<UncontrolledCheckbox name="checkbox" label="Checkbox" readOnly />
		<UncontrolledCheckbox name="checkbox" label="Indeterminate Checkbox" indeterminate readOnly />
		<UncontrolledCheckbox name="checkbox" label="Checked Checkbox" defaultChecked readOnly />
	</StackVertical>
);

type Inputs = {
	'option-a'?: boolean;
	'option-b'?: boolean;
	'inline-option-a'?: boolean;
	'inline-option-b'?: boolean;
	'option-c'?: boolean;
	'option-d'?: boolean;
	'option-e'?: boolean;
	'option-f'?: boolean;
};

export const CheckboxReactHooksForm = () => {
	const { register, handleSubmit } = useForm();
	const [formData, setFormData] = useState<Inputs>();

	return (
		<Form onSubmit={handleSubmit(setFormData)}>
			{formData && (
				<InlineMessageInformation
					title="Form data"
					description={JSON.stringify(formData, null, 2)}
					withBackground
				/>
			)}
			<Form.Fieldset legend="Pick one or multiple options" required>
				<UncontrolledCheckbox label="Option A" name="option-a" ref={register()} />
				<UncontrolledCheckbox label="Option B" name="option-b" ref={register()} defaultChecked />
			</Form.Fieldset>
			<Form.Fieldset legend="Pick one or multiple inline options" required>
				<Form.Row>
					<UncontrolledCheckbox label="Inline option A" name="inline-option-a" ref={register()} />
					<UncontrolledCheckbox
						label="Inline option B"
						name="inline-option-b"
						ref={register()}
						defaultChecked
					/>
				</Form.Row>
			</Form.Fieldset>
			<Form.Fieldset legend="Read only are sent" required readOnly>
				<UncontrolledCheckbox label="Option C" name="option-c" ref={register()} />
				<UncontrolledCheckbox label="Option D" name="option-d" ref={register()} defaultChecked />
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled are not sent" required disabled>
				{/*@see https://github.com/react-hook-form/react-hook-form/issues/6690 */}
				{/* Fixed in RHF v7 - new version is required to handle this usecase with "register({ disabled: true })" */}
				<UncontrolledCheckbox label="Option E" name="option-e" ref={register()} disabled />
				<UncontrolledCheckbox
					label="Option F"
					name="option-f"
					ref={register()}
					defaultChecked
					disabled
				/>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const CheckboxControlled = () => {
	const { register, watch } = useForm();
	const optionA = watch('option-a');
	return (
		<Form>
			<Form.Fieldset legend="Control checkbox state" required>
				<UncontrolledCheckbox label="Toggle all" name="option-a" ref={register()} />

				<Checkbox
					name="option-b"
					label="Controlled checkbox"
					checked={optionA}
					onChange={() => {}}
				/>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};
