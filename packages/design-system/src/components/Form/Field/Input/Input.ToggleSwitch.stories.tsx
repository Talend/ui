import React from 'react';
import Form from '../../index';
import { StackVertical } from '../../../Stack';
import { useForm } from 'react-hook-form';
import { ButtonPrimary } from '../../../Button';
import { InlineMessageInformation } from '../../../InlineMessage';

export default {
	component: Form.ToggleSwitch,
};

export const ToggleSwitch = () => (
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

export const Controlled = () => {
	const { register, watch } = useForm();
	const optionA = watch('option-a');
	return (
		<Form>
			<Form.Fieldset legend="Control switch state" required>
				<Form.ToggleSwitch label="Toggle all" {...register('option-a')} />
				<Form.ToggleSwitch label="Controlled switch" {...register('option-b')} checked={optionA} />
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary onClick={() => {}} type="submit">
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const ReactHooksForm = () => {
	const { register, handleSubmit } = useForm<Inputs>();
	const [formData, setFormData] = React.useState<null | Inputs>();
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
				<Form.ToggleSwitch label="Option a" {...register('option-a')} />
				<Form.ToggleSwitch label="Option b" checked {...register('option-b')} />
			</Form.Fieldset>
			<Form.Fieldset legend="Read only" readOnly>
				<Form.ToggleSwitch label="Option c" {...register('option-c')} />
				<Form.ToggleSwitch label="Option d" checked {...register('option-d')} />
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled" disabled>
				{/* @see https://github.com/react-hook-form/react-hook-form/issues/6690 */}
				<Form.ToggleSwitch label="Option e" {...register('option-e', { disabled: true })} />
				<Form.ToggleSwitch label="Option f" checked {...register('option-f', { disabled: true })} />
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonPrimary onClick={() => {}} type="submit">
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};
