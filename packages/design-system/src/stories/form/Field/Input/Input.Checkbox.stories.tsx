import { useState } from 'react';
import { ButtonPrimary, Form, InlineMessageInformation, StackVertical } from '../../../../';
import { useForm } from 'react-hook-form';

export default {
	title: 'Form/Fields/Checkbox',
	component: Form.Checkbox,
};

export const CheckboxFillStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Checkbox name="checkbox" label="Checkbox" />
		<Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate />
		<Form.Checkbox name="checkbox" label="Checked Checkbox" checked />
	</StackVertical>
);

export const CheckboxFillStatesDisabled = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Checkbox name="checkbox" label="Checkbox" disabled />
		<Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate disabled />
		<Form.Checkbox name="checkbox" label="Checked Checkbox" checked disabled />
	</StackVertical>
);

export const CheckboxFillStatesReadonly = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Checkbox name="checkbox" label="Checkbox" readOnly />
		<Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate readOnly />
		<Form.Checkbox name="checkbox" label="Checked Checkbox" checked readOnly />
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
				<Form.Checkbox label="Option A" {...register('option-a')} />
				<Form.Checkbox label="Option B" checked {...register('option-b')} />
			</Form.Fieldset>
			<Form.Fieldset legend="Pick one or multiple inline options" required>
				<Form.Row>
					<Form.Checkbox label="Inline option A" {...register('inline-option-a')} />
					<Form.Checkbox label="Inline option B" checked {...register('inline-option-b')} />
				</Form.Row>
			</Form.Fieldset>
			<Form.Fieldset legend="Read only are sent" required readOnly>
				<Form.Checkbox label="Option C" {...register('option-c')} />
				<Form.Checkbox label="Option D" checked {...register('option-d')} />
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled are not sent" required disabled>
				{/* @see https://github.com/react-hook-form/react-hook-form/issues/6690 */}
				<Form.Checkbox label="Option E" {...register('option-e', { disabled: true })} />
				<Form.Checkbox label="Option F" checked {...register('option-f', { disabled: true })} />
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
				<Form.Checkbox label="Toggle all" {...register('option-a')} />
				<Form.Checkbox name="option-b" label="Controlled checkbox" checked={optionA} />
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const Basic = (args: any) => <Form.Checkbox {...args} />;

Basic.args = {
	label: 'Checkbox',
	indeterminate: false,
	readOnly: false,
	disabled: false,
};
Basic.argTypes = {
	label: {
		description: 'Checkbox label',
		control: {
			type: 'text',
		},
	},
	indeterminate: {
		description: 'Checkbox is indeterminate or  not',
		control: {
			type: 'boolean',
		},
	},
	checked: {
		description: 'Checkbox is checked or not',
		control: {
			type: 'boolean',
		},
	},
	readOnly: {
		description: 'Checkbox is read only or not',
		control: {
			type: 'boolean',
		},
	},
	disabled: {
		description: 'Checkbox is disabled or not',
		control: {
			type: 'boolean',
		},
	},
};
