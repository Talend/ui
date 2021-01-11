import React from 'react';

import Page from '..';

import Button from '../../components/Button';
import Form from '../../components/Form';
import Link from '../../components/Link';

export default {
	title: 'Pages/Pages',
};

const LoginPageWith = ({ children }) => (
	<Page.Login title="Welcome to Talend Cloud">{children}</Page.Login>
);

export const Disclaimer = () => (
	<LoginPageWith>
		<div className="cookie-disclaimer">
			<div className="cookie-disclaimer__text">
				<p>
					Our website uses cookies designed to enhance your experience through additional analytics
					and functionality.
				</p>
				<p>
					By clicking "Continue" you agree the use of our cookies in accordance with our{' '}
					<Link href="#cookie-policy">Cookie Policy</Link>.
				</p>
				<p>If you would like to proceed with log in please click "Continue".</p>
			</div>
		</div>
	</LoginPageWith>
);

export const Login = () => (
	<LoginPageWith>
		<Form className="login-form">
			<Form.Select label="Region">
				<optgroup label="Amazon Web Services (AWS)">
					<option>Asia Pacific AWS</option>
					<option>Europe AWS</option>
					<option>East America AWS</option>
				</optgroup>
				<optgroup label="Microsoft Azure">
					<option>West America Azure</option>
				</optgroup>
			</Form.Select>
			<Form.Email label="Email" />
			<Form.Password label="Password" />
			<Form.Buttons className="form__buttons">
				<Button.Primary type="submit">Login</Button.Primary>
			</Form.Buttons>
		</Form>
	</LoginPageWith>
);

export const PasswordRecovery = () => (
	<LoginPageWith>
		<div>
			<h2>Log in help</h2>
			<p>Please enter email used for your user account(s).</p>
			<Form>
				<Form.Email label="Email" />
				<Form.Buttons className="form__buttons">
					<Button.Primary type="submit">Submit</Button.Primary>
				</Form.Buttons>
			</Form>
		</div>
	</LoginPageWith>
);

export const Home = () => <Page.Home />;
