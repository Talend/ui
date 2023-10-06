import { useState } from 'react';
import { ButtonPrimary, Form, InlineMessageInformation, StackVertical } from '../../../../';
import { useForm } from 'react-hook-form';

export default {
	title: 'Form/Fields/ToggleSwitch',
	component: Form.ToggleSwitch,
};

export const ToggleSwitchStates = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<UncontrolledToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch" />
		<UncontrolledToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="ToggleSwitch disabled"
			disabled
		/>
		<UncontrolledToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="ToggleSwitch read-only"
			readOnly
		/>
		<UncontrolledToggleSwitch name="time" label="ToggleSwitch checked" defaultChecked />
		<UncontrolledToggleSwitch
			name="time"
			label="ToggleSwitch checked disabled"
			defaultChecked
			disabled
		/>
		<UncontrolledToggleSwitch
			name="time"
			label="ToggleSwitch checked read-only"
			defaultChecked
			readOnly
		/>
	</StackVertical>
);

export const ToggleSwitchInline = () => (
	<>
		<UncontrolledToggleSwitch
			placeholder="Placeholder"
			name="time"
			label="ToggleSwitch inline"
			isInline
		/>
		<span> </span>
		<UncontrolledToggleSwitch
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
		<UncontrolledToggleSwitch
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
				<UncontrolledToggleSwitch label="Toggle all" name="option-a" ref={register()} />
				<Form.ToggleSwitch
					label="Controlled switch"
					name="option-b"
					ref={register()}
					checked={optionA}
					onChange={() => {}}
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

export const ToggleSwitchReactHooksForm = () => {
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
			<Form.Fieldset legend="Enabled">
				<UncontrolledToggleSwitch label="Option a" name="option-a" ref={register()} />
				<UncontrolledToggleSwitch
					label="Option b"
					defaultChecked
					name="option-b"
					ref={register()}
				/>
			</Form.Fieldset>
			<Form.Fieldset legend="Read only" readOnly>
				<UncontrolledToggleSwitch label="Option c" name="option-c" ref={register()} />
				<UncontrolledToggleSwitch
					label="Option d"
					defaultChecked
					name="option-d"
					ref={register()}
				/>
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled" disabled>
				<UncontrolledToggleSwitch label="Option e" disabled name="option-e" ref={register()} />
				<UncontrolledToggleSwitch
					label="Option f"
					defaultChecked
					disabled
					name="option-f"
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
