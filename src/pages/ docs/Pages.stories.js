import React from 'react';

import Page from '..';
import Footer from '../blocks/Footer';
import { LoginForm, LoginHelp, CookieDisclaimer, SignupCTA } from '../Login';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

export default {
	title: 'Pages/Pages',
};

const LoginPageWith = ({ children }) => (
	<Page.Login title="Welcome to Talend Cloud" footer={<Footer />} />
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
