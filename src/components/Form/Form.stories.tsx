import React from 'react';
import { action } from '@storybook/addon-actions';

import Form from '.';
import Button from '../Button';
import InlineMessage from '../InlineMessage';
import Skeleton from '../Skeleton';
import Link from '../Link';

import CountryCodes from './docs/data/CountryCodes.json';

function getCountryCodes() {
	// eslint-disable-next-line @typescript-eslint/camelcase
	return CountryCodes.map(({ name, dial_code }) => `${name} (${dial_code})`);
}

export const FormSkeleton = () => (
	<Form>
		<Skeleton.Heading />
		<Skeleton />
		<Skeleton />
		<Form.Buttons>
			<Skeleton.Button />
			<Skeleton.Button />
		</Form.Buttons>
	</Form>
);
FormSkeleton.parameters = {};

export const Default = () => (
	<Form>
		<Form.Fieldset legend="Complete your registration">
			<Form.Row>
				<Form.Text label="First Name" required />
				<Form.Text label="Last Name" required />
			</Form.Row>
			<Form.Text label="Company" value="Talend" required />
			<Form.InputGroup
				label="Phone"
				prefix={
					<Form.Select label="Phone prefix" value="France (+33)">
						{getCountryCodes().map((countryCode, key) => (
							<option key={key}>{countryCode}</option>
						))}
					</Form.Select>
				}
				hasError
				description="Phone number is invalid"
				required
			>
				<Form.Tel label="Phone number" value="6121314k" />
			</Form.InputGroup>
			<Form.Select label="Industry">
				<option selected>IT</option>
			</Form.Select>
			<Form.Password label="Password" />
			<Form.Password label="Repeat password" />
			<Form.Checkbox checked required>
				I have read and accept the <Link href="#">terms of use</Link>
			</Form.Checkbox>
			<Form.Buttons>
				<Button.Primary onClick={action('submit')}>Complete Registration</Button.Primary>
			</Form.Buttons>
		</Form.Fieldset>
	</Form>
);
Default.parameters = {};

export const Error = () => (
	<div style={{ margin: '0 auto', width: '35rem' }}>
		<Form>
			<Form.Fieldset legend="Login">
				<InlineMessage.Destructive
					title="Login failed"
					description="Please verify your email and password."
					withBackground
				/>
				<Form.Text label="Email" required value="name@company.com" />
				<Form.Password label="Password" required value="password" />
			</Form.Fieldset>
			<Form.Buttons style={{ justifyContent: 'center' }}>
				<Button.Primary onClick={action('clicked')}>Login</Button.Primary>
			</Form.Buttons>
		</Form>
	</div>
);
Error.parameters = {};

export const Disabled = () => (
	<Form>
		<Form.Fieldset legend="Complete your registration">
			<Form.Row>
				<Form.Text label="First Name" required disabled />
				<Form.Text label="Last Name" required disabled />
			</Form.Row>
			<Form.Text label="Company" value="Talend" required disabled />
			<Form.InputGroup
				label="Phone"
				disabled
				prefix={
					<Form.Select label="Phone prefix" value="France (+33)" disabled>
						{getCountryCodes().map((countryCode, key) => (
							<option key={key}>{countryCode}</option>
						))}
					</Form.Select>
				}
				hasError
				description="Phone number is invalid"
				required
			>
				<Form.Tel label="Phone number" value="6121314k" />
			</Form.InputGroup>
			<Form.Select label="Industry" disabled>
				<option selected>IT</option>
			</Form.Select>
			<Form.Password label="Password" disabled />
			<Form.Password label="Repeat password" disabled />
			<Form.Checkbox checked required disabled>
				I have read and accept the <Link href="#">terms of use</Link>
			</Form.Checkbox>
			<Form.Buttons>
				<Button.Primary onClick={action('submit')} disabled>
					Complete Registration
				</Button.Primary>
			</Form.Buttons>
		</Form.Fieldset>
	</Form>
);
Disabled.parameters = {};

export const ReadOnly = () => (
	<Form>
		<Form.Fieldset legend="Complete your registration">
			<Form.Row>
				<Form.Text label="First Name" required readOnly />
				<Form.Text label="Last Name" required readOnly />
			</Form.Row>
			<Form.Text label="Company" value="Talend" required readOnly />
			<Form.InputGroup
				label="Phone"
				readOnly
				prefix={
					<Form.Select label="Phone prefix" value="France (+33)" readOnly>
						{getCountryCodes().map((countryCode, key) => (
							<option key={key}>{countryCode}</option>
						))}
					</Form.Select>
				}
				hasError
				description="Phone number is invalid"
				required
			>
				<Form.Tel label="Phone number" value="6121314k" readOnly />
			</Form.InputGroup>
			<Form.Select label="Industry" readOnly>
				<option selected>IT</option>
			</Form.Select>
			<Form.Password label="Password" readOnly />
			<Form.Password label="Repeat password" readOnly />
			<Form.Checkbox checked required readOnly>
				I have read and accept the <Link href="#">terms of use</Link>
			</Form.Checkbox>
			<Form.Buttons>
				<Button.Primary onClick={action('submit')} readOnly>
					Complete Registration
				</Button.Primary>
			</Form.Buttons>
		</Form.Fieldset>
	</Form>
);
ReadOnly.parameters = {};

export const InlineHelp = () => (
	<div style={{ margin: '0 auto', width: '35rem' }}>
		<Form>
			<Form.Fieldset legend="Change your password">
				<InlineMessage.Information
					description="You can reset the password for your account by  completing this form"
					withBackground
				/>
				<Form.Password label="New password" required value="password" />
				<Form.Password label="Re-enter new password" required />
			</Form.Fieldset>
			<Form.Buttons>
				<Button.Secondary onClick={action('clicked')}>Cancel</Button.Secondary>
				<Button.Primary onClick={action('clicked')}>Save</Button.Primary>
			</Form.Buttons>
		</Form>
	</div>
);
InlineHelp.parameters = {};

export const Loading = () => (
	<div style={{ margin: '0 auto', width: '60rem' }}>
		<Form>
			<Form.Fieldset legend="Run job">
				<Form.Text label="Name" required disabled placeholder="Job using JDBC connection" />
				<Form.Textarea label="Description" disabled placeholder="Describe the job" />
			</Form.Fieldset>
			<Form.Buttons>
				<Button.Secondary disabled>Previous</Button.Secondary>
				<Button.Secondary disabled>Save</Button.Secondary>
				<Button.Primary icon="talend-launch" loading>
					Run
				</Button.Primary>
			</Form.Buttons>
		</Form>
	</div>
);
Loading.parameters = {};
