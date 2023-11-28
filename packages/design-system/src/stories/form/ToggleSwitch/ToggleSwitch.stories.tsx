import { useState } from 'react';
import { ButtonPrimary, Form, InlineMessageInformation, StackVertical } from '../../../../';
import { useForm } from 'react-hook-form';

export default {
	title: 'Form/Fields/ToggleSwitch',
	component: Form.ToggleSwitch,
};

export const ToggleSwitchStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch" />
		<Form.ToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="ToggleSwitch disabled"
			disabled
		/>
		<Form.ToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="ToggleSwitch read-only"
			readOnly
		/>
		<Form.ToggleSwitch name="time" label="ToggleSwitch checked" defaultChecked />
		<Form.ToggleSwitch name="time" label="ToggleSwitch checked disabled" defaultChecked disabled />
		<Form.ToggleSwitch name="time" label="ToggleSwitch checked read-only" defaultChecked readOnly />
	</StackVertical>
);

export const ToggleSwitchInline = () => (
	<>
		<Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch inline" isInline />
		<span> </span>
		<Form.ToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="ToggleSwitch inline"
			isInline
			defaultChecked
		/>
	</>
);

export const ToggleSwitchWithLongLabel = () => (
	<div style={{ width: '200px' }}>
		<Form.ToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="Label with a lot of content, too much probably, and most certainly enough to generate a line break in this small box."
		/>
	</div>
);

type Inputs = {
	'option-a'?: boolean;
	'option-b'?: boolean;
	'option-c'?: boolean;
	'option-d'?: boolean;
	'option-e'?: boolean;
	'option-f'?: boolean;
};

export const ToggleSwitchControlled = () => {
	const { register, watch } = useForm();
	const optionA = watch('option-a');
	return (
		<Form>
			<Form.Fieldset legend="Control switch state" required>
				<Form.ToggleSwitch label="Toggle all" {...register('option-a')} />
				<Form.ToggleSwitch label="Controlled switch" checked={optionA} {...register('option-b')} />
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary onClick={() => {}} type="submit">
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const ToggleSwitchReactHooksForm = () => {
	const { register, handleSubmit, watch } = useForm<Inputs>();
	const [formData, setFormData] = useState<null | Inputs>();
	const watchAllFields = watch();

	return (
		<Form onSubmit={handleSubmit(setFormData)}>
			{formData && (
				<InlineMessageInformation
					title={'Form data'}
					description={JSON.stringify(formData, null, 2)}
					withBackground
				/>
			)}
			<Form.Fieldset legend="Enabled">
				<Form.ToggleSwitch
					label="Option a"
					{...register('option-a')}
					checked={watchAllFields['option-a']}
				/>
				<Form.ToggleSwitch
					label="Option b"
					defaultChecked
					{...register('option-b')}
					checked={watchAllFields['option-b']}
				/>
			</Form.Fieldset>
			<Form.Fieldset legend="Read only" readOnly>
				<Form.ToggleSwitch
					label="Option c"
					{...register('option-c')}
					checked={watchAllFields['option-c']}
				/>
				<Form.ToggleSwitch
					label="Option d"
					defaultChecked
					{...register('option-d')}
					checked={watchAllFields['option-d']}
				/>
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled" disabled>
				<Form.ToggleSwitch
					label="Option e"
					disabled
					{...register('option-e')}
					checked={watchAllFields['option-e']}
				/>
				<Form.ToggleSwitch
					label="Option f"
					defaultChecked
					disabled
					{...register('option-f')}
					checked={watchAllFields['option-f']}
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
