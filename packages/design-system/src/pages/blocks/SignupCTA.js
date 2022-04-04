import React from 'react';
import styled from 'styled-components';

import { ButtonSecondary } from '../../components/Button';

import tokens from '../../tokens';

const SSignupCTA = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3rem;

	.signup-cta__text {
		margin-bottom: 2rem;
		font-weight: ${tokens.fontWeights.semiBold};
		color: ${({ theme }) => theme.colors.textColor};
	}
`;

export const SignupCTA = () => (
	<SSignupCTA className="signup-cta">
		<strong className="signup-cta__text">Don't have an account yet?</strong>
		<span className="signup-cta__button">
			<ButtonSecondary id="trial-registration-button">Sign up</ButtonSecondary>
		</span>
	</SSignupCTA>
);

export default SignupCTA;
