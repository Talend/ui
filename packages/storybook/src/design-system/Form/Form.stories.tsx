import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ButtonPrimary, ButtonSecondary, Divider, Form, InlineMessageDestructive, InlineMessageInformation, Skeleton, StackHorizontal, StackVertical } from '@talend/design-system';

import CountryCodes from './docs/data/CountryCodes.json';

export default {
	component: Form,
};

function getCountryCodes() {
	return CountryCodes.map(({ name, dial_code }) => `${name} (${dial_code})`);
}

export const FormSkeleton = () => (
	<Form>
		<StackVertical gap="S" justify="stretch" align="stretch">
			<Skeleton variant="heading" />
			<Skeleton variant="input" />
			<Skeleton variant="input" />
		</StackVertical>
		<Form.Buttons>
			<Skeleton variant="button" />
			<Skeleton variant="button" />
		</Form.Buttons>
	</Form>
);
FormSkeleton.parameters = {};

export const Default = () => {
	const [formState, setFormState] = useState<'disabled' | 'readOnly' | null>(null);
	return (
		<Form disabled={formState === 'disabled'} readOnly={formState === 'readOnly'}>
			<StackHorizontal gap="M" justify="spaceBetween" align="start">
				<ButtonSecondary onClick={() => setFormState(null)}>
					{!formState && '· '} Reset state
				</ButtonSecondary>

				<ButtonSecondary onClick={() => setFormState('disabled')}>
					{formState === 'disabled' && '· '} Disabled fields
				</ButtonSecondary>

				<ButtonSecondary onClick={() => setFormState('readOnly')}>
					{formState === 'readOnly' && '· '} ReadOnly fields
				</ButtonSecondary>
			</StackHorizontal>
			<Divider />
			<Form.Fieldset legend="Complete your registration">
				<Form.Text label="Input" name="input" required />
				<Form.Text
					label="Input with error"
					name="error-input"
					required
					hasError
					description="Lorem ipsum dolor sit amet"
				/>
				<Form.Tel
					label="Phone"
					name="tel"
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
				<Form.Text
					label="Column"
					name="column"
					required
					suffix={{
						required: true,
						type: 'select',
						label: 'column-type',
						name: 'column-type',
						defaultValue: 'Boolean',
						children: [
							<option key="bool">Boolean</option>,
							<option key="string">String</option>,
							<option key="numb">Number</option>,
							<option key="obj">Object</option>,
						],
					}}
				/>
				<Form.Number label="Amount" name="amount" prefix="$" suffix=".00" />
				<Form.File label="File" name="file" />
				<Form.Password label="Password" name="password" />
				<Form.Search label="Search" name="search" />
				<Form.Textarea label="Textarea" name="textarea" />
				<Form.Select label="Select" name="select">
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Checkbox checked required id="test-checkbox" name="test-checkbox" label="Checkbox" />
				<Form.Radio label="Radio" name="radio" checked />
				<Form.ToggleSwitch label="Switch" checked name="Switch" />
				<Form.Buttons>
					<ButtonSecondary type="reset" onClick={action('cancel')}>
						Reset
					</ButtonSecondary>
					<ButtonPrimary onClick={action('submit')}>Submit</ButtonPrimary>
				</Form.Buttons>
			</Form.Fieldset>
		</Form>
	);
};

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
				<ButtonPrimary onClick={action('clicked')} icon="triangle-circle" isLoading>
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
