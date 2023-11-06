import { useState } from 'react';
import { ButtonPrimary, Form, InlineMessageInformation, StackVertical } from '../../../../';
import { useForm } from 'react-hook-form';

export default {
	title: 'Form/Fields/Radio',
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

export const RadioReactHooksForm = () => {
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
				<Form.Radio label="Option A" value="option-a" {...register('option')} />
				<Form.Radio label="Option B" value="option-b" defaultChecked {...register('option')} />
			</Form.Fieldset>
			<Form.Fieldset legend="Pick one inline option" required>
				<Form.Row>
					<Form.Radio label="Inline option A" value="option-a" {...register('inline-option')} />
					<Form.Radio
						label="Inline option B"
						value="option-b"
						defaultChecked
						{...register('inline-option')}
					/>
				</Form.Row>
			</Form.Fieldset>
			<Form.Fieldset legend="Read only are sent" required readOnly>
				<Form.Radio label="Option C" value="option-c" {...register('readonly-option')} />
				<Form.Radio label="Option D" value="option-d" checked {...register('readonly-option')} />
			</Form.Fieldset>
			<Form.Fieldset legend="Disabled are not sent" required disabled>
				<Form.Radio
					label="Option E"
					value="option-e"
					disabled
					{...register('disabled-inline-option')}
				/>
				<Form.Radio
					label="Option F"
					value="option-f"
					checked
					disabled
					{...register('disabled-inline-option')}
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

export const Basic = (args: any) => <Form.Radio {...args} />;

Basic.args = {
	label: 'Radio',
	checked: false,
	readOnly: false,
	disabled: false,
};
Basic.argTypes = {
	label: {
		description: 'Radio label',
		control: {
			type: 'text',
		},
	},
	checked: {
		description: 'Radio is checked or  not',
		control: {
			type: 'boolean',
		},
	},
	readOnly: {
		description: 'Radio is read only or not',
		control: {
			type: 'boolean',
		},
	},
	disabled: {
		description: 'Radio is disabled or not',
		control: {
			type: 'boolean',
		},
	},
};
