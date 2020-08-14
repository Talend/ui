import React from 'react';

import Page from '..';
import { LoginForm, LoginHelp, CookieDisclaimer, SignupCTA, FooterWithLinks } from '../Login';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

export default {
	title: 'Pages/Pages',
};

const LoginPageWith = ({ children }) => (
	<Page.Login
		main={
			<Card>
				<Card.Heading>
					<div className="talend-logo">
						<Icon name="talendLogo" />
					</div>
					<h1>Welcome to Talend Cloud</h1>
				</Card.Heading>
				<Card.Body>
					{children}
					<SignupCTA />
				</Card.Body>
			</Card>
		}
		footer={<FooterWithLinks />}
	/>
);

export const Disclaimer = () => (
	<LoginPageWith>
		<CookieDisclaimer />
	</LoginPageWith>
);

export const Login = () => (
	<LoginPageWith>
		<LoginForm />
	</LoginPageWith>
);

export const PasswordRecovery = () => (
	<LoginPageWith>
		<LoginHelp />
	</LoginPageWith>
);

export const Home = () => <Page.Home />;
