import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Form from '../index';
import { ButtonPrimary, ButtonSecondary } from '../../Button';
import { InlineMessageDestructive, InlineMessageInformation } from '../../InlineMessage';

export default {
	component: Form.Fieldset,
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

type FormData = {
	accountName: string;
	numberOfSlots: number;
	withUser: boolean;
};

type FormDataWithUser = FormData & {
	name: string;
	email: string;
};

export const ConditionalFieldset = () => {
	const [withUser, setWithUser] = useState(false);
	const [formData, setFormData] = useState<string | null>(null);
	const {
		register,
		watch,
		handleSubmit,
		unregister,
		formState: { errors },
	} = useForm<FormData | FormDataWithUser>();
	const withUserFormSelection = watch('withUser', false);
	const hasMultipleErrors = Object.keys(errors).length > 1;

	useEffect(() => {
		setWithUser(withUserFormSelection);
		if (!withUserFormSelection) {
			unregister('name');
			unregister('email');
		}
	}, [withUserFormSelection]);

	const onSubmit = (data: FormData | FormDataWithUser) => {
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
						{...register('accountName', { required: 'This field is required' })}
					/>
					<Form.Password
						label="Account name"
						suffix=".info"
						hasError={!!errors.accountName}
						description={(!hasMultipleErrors && errors.accountName?.message) || undefined}
						{...register('accountName', { required: 'This field is required' })}
					/>
					<Form.Number
						label="Slots"
						hasError={!!errors.numberOfSlots}
						description={(!hasMultipleErrors && errors.numberOfSlots?.message) || undefined}
						{...register('numberOfSlots', { required: 'This field is required' })}
					/>
				</Form.Row>
				<Form.ToggleSwitch label="Send invite to admin user" {...register('withUser')} />
			</Form.Fieldset>
			{withUser && (
				<Form.Fieldset legend="Invite admin for this account">
					<Form.Password
						label="Account name"
						suffix=".info"
						hasError={!!errors.accountName}
						description={(!hasMultipleErrors && errors.accountName?.message) || undefined}
						{...register('accountName', { required: 'This field is required' })}
					/>
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
