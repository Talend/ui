import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

import tokens from '../../tokens';

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

export const SignupCTA = () => (
	<SSignupCTA className="signup-cta">
		<strong className="signup-cta__text">Don't have an account yet?</strong>
		<Button.Secondary id="trial-registration-button" className="signup-cta__button">
			Sign up
		</Button.Secondary>
	</SSignupCTA>
);

export default SignupCTA;
