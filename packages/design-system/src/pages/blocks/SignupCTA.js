import React from 'react';
import styled from 'styled-components';
import tokens from '@talend/design-tokens';

import { ButtonSecondary } from '../../components/Button';

const SSignupCTA = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3rem;

	.signup-cta__text {
		margin-bottom: 2rem;
		font: ${tokens.coralHeadingS};
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
