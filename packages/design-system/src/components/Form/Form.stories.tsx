import React from 'react';
import { action } from '@storybook/addon-actions';

import Form from '.';
import { ButtonPrimary, ButtonSecondary } from '../Button';
import { InlineMessageDestructive, InlineMessageInformation } from '../InlineMessage';
import Skeleton from '../Skeleton';
import Link from '../Link';

import CountryCodes from './docs/data/CountryCodes.json';
import { StackVertical } from '../Stack';

export default {
	component: Form,
};

function getCountryCodes() {
	return CountryCodes.map(({ name, dial_code }) => `${name} (${dial_code})`);
}

export const FormSkeleton = () => (
	<Form>
		<StackVertical gap="S">
			<Skeleton variant="heading" />
			<Skeleton variant="paragraph" />
			<Skeleton variant="paragraph" />
		</StackVertical>
		<Form.Buttons>
			<Skeleton variant="button" />
			<Skeleton variant="button" />
		</Form.Buttons>
	</Form>
);
FormSkeleton.parameters = {};

export const Default = () => (
	<Form>
		<Form.Fieldset legend="Complete your registration">
			<Form.Row>
				<Form.Text label="First Name" name="firstname" required />
				<Form.Text label="Last Name" name="lastname" required />
			</Form.Row>
			<Form.Text label="Company" value="Talend" name="company" required />
			<Form.Tel
				label="Phone number"
				name="tel"
				value="6121314k"
				required
				hasError
				description="This field is required"
				prefix={{
					required: true,
					type: 'select',
					label: 'phone',
					name: 'phone',
					defaultValue: 'France (+33)',
					children: getCountryCodes().map((countryCode, key) => (
						<option key={key}>{countryCode}</option>
					)),
				}}
			/>
			<Form.Select name="select" label="Industry">
				<option selected>IT</option>
			</Form.Select>
			<Form.Password label="Password" name="password" />
			<Form.Password label="Repeat password" name="password-repeat" />
			<Form.Checkbox
				checked
				required
				id="test-checkbox"
				name="test-checkbox"
				label={
					<>
						I have read and accept the <Link href="#">terms of use</Link>
					</>
				}
			/>
			<Form.Buttons>
				<ButtonPrimary onClick={action('submit')}>Complete Registration</ButtonPrimary>
			</Form.Buttons>
		</Form.Fieldset>
	</Form>
);
Default.parameters = {};

export const Error = () => (
	<div style={{ margin: '0 auto', width: '35rem' }}>
		<Form>
			<Form.Fieldset legend="Login">
				<InlineMessageDestructive
					title="Login failed"
					description="Please verify your email and password."
					withBackground
				/>
				<Form.Text label="Email" name="email" required value="name@company.com" />
				<Form.Password label="Password" required value="password" name="password" />
			</Form.Fieldset>
			<Form.Buttons style={{ justifyContent: 'center' }}>
				<ButtonPrimary onClick={action('clicked')}>Login</ButtonPrimary>
			</Form.Buttons>
		</Form>
	</div>
);
Error.parameters = {};

export const Disabled = () => (
	<Form disabled>
		<Form.Fieldset legend="Complete your registration">
			<Form.Row>
				<Form.Text label="First Name" name="firstname" required />
				<Form.Text label="Last Name" name="lastname" required />
			</Form.Row>
			<Form.Text label="Company" name="company" value="Talend" required />
			<Form.Tel
				label="Phone number"
				name="tel"
				value="6121314k"
				required
				prefix={{
					required: true,
					type: 'select',
					label: 'phone',
					name: 'phone',
					defaultValue: 'France (+33)',
					children: getCountryCodes().map((countryCode, key) => (
						<option key={key}>{countryCode}</option>
					)),
				}}
			/>
			<Form.Select name="select" label="Industry">
				<option selected>IT</option>
			</Form.Select>
			<Form.Password label="Password" name="password" />
			<Form.Password label="Repeat password" name="repeat-password" />
			<Form.Checkbox
				checked
				required
				name="checkbox"
				label={
					<>
						I have read and accept the <Link href="#">terms of use</Link>
					</>
				}
			/>
			<Form.Buttons>
				<ButtonPrimary onClick={action('submit')}>Complete Registration</ButtonPrimary>
			</Form.Buttons>
		</Form.Fieldset>
	</Form>
);
Disabled.parameters = {};

export const ReadOnly = () => (
	<Form readOnly>
		<Form.Fieldset legend="Complete your registration">
			<Form.Row>
				<Form.Text label="First Name" name="firstname" required />
				<Form.Text label="Last Name" name="lastname" required />
			</Form.Row>
			<Form.Text label="Company" name="company" value="Talend" required />
			<Form.Tel
				label="Phone number"
				name="tel"
				value="6121314k"
				required
				hasError
				description="This is required"
				prefix={{
					required: true,
					type: 'select',
					label: 'phone',
					name: 'phone',
					defaultValue: 'France (+33)',
					children: getCountryCodes().map((countryCode, key) => (
						<option key={key}>{countryCode}</option>
					)),
				}}
			/>
			<Form.Select name="select" label="Industry">
				<option selected>IT</option>
			</Form.Select>
			<Form.Password label="Password" name="password" />
			<Form.Password label="Repeat password" name="password-repeat" />
			<Form.Checkbox
				checked
				required
				name="checkbox"
				label={
					<>
						I have read and accept the <Link href="#">terms of use</Link>
					</>
				}
			/>
			<Form.Buttons>
				<ButtonPrimary onClick={action('submit')}>Complete Registration</ButtonPrimary>
			</Form.Buttons>
		</Form.Fieldset>
	</Form>
);
ReadOnly.parameters = {};

export const InlineHelp = () => (
	<div style={{ margin: '0 auto', width: '35rem' }}>
		<Form>
			<Form.Fieldset legend="Change your password">
				<InlineMessageInformation
					description="You can reset the password for your account by  completing this form"
					withBackground
				/>
				<Form.Password label="New password" required value="password" name="password" />
				<Form.Password label="Re-enter new password" required name="repeat" />
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={action('clicked')}>Cancel</ButtonSecondary>
				<ButtonPrimary onClick={action('clicked')}>Save</ButtonPrimary>
			</Form.Buttons>
		</Form>
	</div>
);
InlineHelp.parameters = {};

export const Loading = () => (
	<div style={{ margin: '0 auto', width: '60rem' }}>
		<Form disabled>
			<Form.Fieldset legend="Run job">
				<Form.Text label="Name" name="text" required placeholder="Job using JDBC connection" />
				<Form.Textarea name="description" label="Description" placeholder="Describe the job" />
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={action('clicked')}>Previous</ButtonSecondary>
				<ButtonSecondary onClick={action('clicked')}>Save</ButtonSecondary>
				<ButtonPrimary onClick={action('clicked')} icon="talend-launch" isLoading>
					Run
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	</div>
);
Loading.parameters = {};

export const AboutRowsDefault = () => {
	return (
		<Form>
			<Form.Row>
				<Form.Text label="Name" name="name" required placeholder="Ex: Jane" />
				<Form.Text label="Surname" name="surname" required placeholder="Ex: Doe" />
			</Form.Row>
		</Form>
	);
};

export const AboutRowsStretch = () => {
	return (
		<Form>
			<Form.Row isStretched>
				<Form.Text label="Name" name="name" required placeholder="What do your parents call you?" />
				<Form.Text
					label="Surname"
					name="surname"
					required
					placeholder="What does your boss call you?"
				/>
			</Form.Row>
		</Form>
	);
};
