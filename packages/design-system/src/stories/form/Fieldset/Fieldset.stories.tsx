import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	ButtonPrimary,
	ButtonSecondary,
	Form,
	InlineMessageDestructive,
	InlineMessageInformation,
} from '../../../';

export default {
	component: Form.Fieldset,
	title: 'Form/Fieldset',
};

export const Default = () => {
	return (
		<Form>
			<Form.Fieldset legend="Frequency">
				<Form.Select name="repeat" label="Repeat">
					<option>At specific intervals</option>
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Row>
					<Form.Number label="Minutes" suffix="minutes" name="minutes" />
					<Form.Time name="repeat-from" label="Repeat from" required />
					<Form.Time name="repeat-to" label="Repeat to" required />
				</Form.Row>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const Error = () => {
	return (
		<Form>
			<Form.Fieldset legend="Frequency">
				<Form.Select name="repeat" label="Repeat">
					<option>At specific intervals</option>
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Row>
					<Form.Number label="Minutes" suffix="minutes" name="minutes" />
					<Form.Time
						hasError
						name="repeat-from"
						label="Repeat from"
						required
						description="Repeat from is invalid"
					/>
					<Form.Time name="repeat-to" label="Repeat to" required />
				</Form.Row>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const Errors = () => {
	return (
		<Form>
			<Form.Fieldset legend="Frequency">
				<Form.Select name="repeat" label="Repeat">
					<option>At specific intervals</option>
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Row>
					<Form.Number label="Minutes" suffix="minutes" name="minutes" />
					<Form.Time
						hasError
						name="repeat-from"
						label="Repeat from"
						required
						description="Repeat from is invalid"
					/>
					<Form.Time
						hasError
						name="repeat-to"
						label="Repeat to"
						required
						description="Repeat to is invalid"
					/>
				</Form.Row>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

type FormDataWithUser = {
	accountName: string;
	numberOfSlots: number;
	withUser: boolean;
	name?: string;
	email?: string;
};

export const ConditionalFieldset = () => {
	const [formData, setFormData] = useState<string | null>(null);
	const { register, watch, handleSubmit, unregister, formState } = useForm<FormDataWithUser>();
	const { errors } = formState;

	const withUserFormSelection = watch('withUser', false);
	const hasMultipleErrors = Object.keys(errors).length > 1;

	useEffect(() => {
		if (!withUserFormSelection) {
			unregister('name');
			unregister('email');
		}
	}, [withUserFormSelection]);

	const onSubmit = (data: FormDataWithUser) => {
		setFormData(JSON.stringify(data));
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Fieldset legend="Create an account">
				{hasMultipleErrors && (
					<Form.Row>
						<InlineMessageDestructive
							description="Every displayed field is required"
							withBackground
						/>
					</Form.Row>
				)}
				{formData && (
					<Form.Row>
						<InlineMessageInformation
							title="Form submitted"
							description={formData}
							withBackground
						/>
					</Form.Row>
				)}
				<Form.Row>
					<Form.Text
						label="Account name"
						suffix=".info"
						hasError={!!errors.accountName}
						description={(!hasMultipleErrors && errors.accountName?.message) || undefined}
						required
						{...register('accountName', { required: 'This field is required' })}
					/>
					<Form.Number
						label="Slots"
						hasError={!!errors.numberOfSlots}
						description={(!hasMultipleErrors && errors.numberOfSlots?.message) || undefined}
						required
						{...register('numberOfSlots', { required: 'This field is required' })}
					/>
				</Form.Row>
				<Form.ToggleSwitch
					label="Send invite to admin user"
					{...register('withUser')}
					checked={withUserFormSelection}
				/>
			</Form.Fieldset>
			{withUserFormSelection && (
				<Form.Fieldset legend="Invite admin for this account">
					<Form.Text
						label="Username"
						hasError={'name' in errors && !!errors.name}
						description={
							(!hasMultipleErrors && 'name' in errors && errors.name?.message) || undefined
						}
						{...register('name', { required: 'This field is required' })}
					/>
					<Form.Email
						label="User email"
						hasError={'email' in errors && !!errors.email}
						description={
							(!hasMultipleErrors && 'email' in errors && errors.email?.message) || undefined
						}
						{...register('email', { required: 'This field is required' })}
					/>
				</Form.Fieldset>
			)}
			<Form.Buttons>
				<ButtonSecondary type="reset">Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};
