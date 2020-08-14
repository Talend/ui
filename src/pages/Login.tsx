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

export const LoginForm = () => (
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
);

export const LoginHelp = () => (
	<>
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
	</>
);

const SSignupCTA = styled.div(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3rem;

	.signup-cta__text {
		margin-bottom: 2rem;
		font-weight: ${tokens.fontWeights.semiBold};
		color: ${theme.colors.textColor};
	}
`,
);

export const CookieDisclaimer = ({ onAcceptClick }) => (
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

		<div className="cookie-disclaimer__button">
			<Button.Primary id="cookie-disclaimer-button" onClick={onAcceptClick}>
				Continue
			</Button.Primary>
		</div>
	</div>
);

export const SignupCTA = () => (
	<SSignupCTA className="signup-cta">
		<strong className="signup-cta__text">Don't have an account yet?</strong>
		<Button.Secondary id="trial-registration-button">Sign up</Button.Secondary>
	</SSignupCTA>
);

export const FooterWithLinks = () => (
	<Layout.Footer className="footer">
		<Link href="#cookie-policy">Cookie policy</Link>
		<Link href="#terms-use">Terms of use</Link>
		<Link href="#us-eula">Talend EULA</Link>
	</Layout.Footer>
);

const SWrapper = styled.div(
	({ theme }) => `
	width: 100vw;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;

	@media only screen and (min-width: 468px) {
		background-image: url(${Datachaos}), linear-gradient(134deg, #19426c, #2c1f56);
		overflow: auto;
	}

	.layout__main {
		background: none;

		@media only screen and (min-width: 768px) {
		    flex: 1 1 auto;
    		padding: 5rem;	
		}
	}

	.card__heading {
		display: flex;
		flex-direction: column;
		justify-content: center;

		.talend-logo {
			display: flex;
			justify-content: center;
			height: 33px;
			width: 100%;

			svg {
				height: 3.2rem;
				max-width: 100%;
			}
		}

		h1 {
			margin: 1.5rem 0;
			font-size: 2.1rem;
			font-family: ${tokens.fonts.sansSerif};
			font-weight: ${tokens.fontWeights.semiBold};
		}
	}

	.card__body {
		.cookie-disclaimer,
		.form__buttons,
		.signup-cta {
			text-align: center;
			justify-content: center;
		}

		.form__buttons,
		.cookie-disclaimer__button {
			padding: 2rem 0;
		}
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0.5rem 0;

		@media only screen and (min-width: 468px) {
			color: ${tokens.colors.gray0};
			flex-direction: row;
		}

		.footer__links {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			margin: 0;
			padding: 0;

			&-item {
				display: inline-flex;
				padding: 0 1rem;
				border-right: 1px solid ${tokens.colors.gray75};

				&:last-child {
					border-right-color: transparent;
				}

				@media only screen and (min-width: 468px) {
					&,
					&:last-child {
						border-right-color: ${tokens.colors.gray0};
					}
				}
			}
		}

		.footer__link {
			color: ${theme.colors.textColor};

			&:hover,
			&:focus {
				// color: $footer-link-hover-color;
			}

			&:active {
				// color: $footer-link-active-color;
			}

			@media only screen and (min-width: 468px) {
				color: ${tokens.colors.gray0};
			}
		}

		.footer__copyright {
			padding: 0 1rem;
			font-weight: 300;
		}
	}
`,
);

const Login = ({ main, footer }) => (
	<SWrapper>
		<Layout hasOverflow main={main} footer={footer} />
	</SWrapper>
);

export default Login;
