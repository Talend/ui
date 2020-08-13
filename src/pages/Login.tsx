import React from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import Card from '../components/Card';
import Form from '../components/Form';
import Icon from '../components/Icon';
import Layout from '../components/Layout';
import Link from '../components/Link';

import Datachaos from '../images/datachaos.png';

import tokens from '../tokens';

const SignupCTA = () => (
	<div className="login-form__signup-cta">
		<div className="signup-cta">
			<strong className="signup-cta__text">Vous n'avez pas encore de compte&nbsp;?</strong>
			<Button.Secondary id="trial-registration-button">Sign in</Button.Secondary>
		</div>
	</div>
);

const Main = () => (
	<Card>
		<Card.Heading>
			<Icon name="talendLogo" />
			Welcome to Talend Cloud
		</Card.Heading>
		<Card.Body>
			<Form className="login-form">
				<Form.Select
					label="Region"
					values={{
						'Amazon Web Services (AWS)': ['Asia Pacific AWS', 'Europ AWS', 'East America AWS'],
						'Microsoft Azure': ['West America Azure'],
					}}
				/>
				<Form.Email label="Email" />
				<Form.Password label="Password" />
				<Form.Buttons className="form__buttons">
					<Button.Primary type="submit">Login</Button.Primary>
				</Form.Buttons>
			</Form>
			<SignupCTA />
		</Card.Body>
	</Card>
);

const FooterWithLinks = () => (
	<Layout.Footer>
		<Link href="#cookie-policy">Cookie policy</Link>
		<Link href="#terms-use">Terms use</Link>
		<Link href="#us-eula">EULA</Link>
	</Layout.Footer>
);

const Background = styled.div`
	width: 100vw;
	background: url(${Datachaos}), linear-gradient(134deg, #19426c, #2c1f56);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	.layout__main {
		background: none;

		.form__buttons,
		.signup-cta {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.layout__footer {
		&,
		.link__text {
			color: ${tokens.colors.gray0};
		}
	}
`;

const Login = () => (
	<Background>
		<Layout hasOverflow main={<Main />} footer={<FooterWithLinks />} />
	</Background>
);

export default Login;
