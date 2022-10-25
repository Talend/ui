import React from 'react';
import theme from './SignupCTA.module.scss';

import { ButtonSecondary } from '../../components/Button';

export const SignupCTA = () => (
	<div className={theme['signup-cta']}>
		<strong className={theme['signup-cta__text']}>Don't have an account yet?</strong>
		<span className="signup-cta__button">
			<ButtonSecondary id="trial-registration-button">Sign up</ButtonSecondary>
		</span>
	</div>
);

export default SignupCTA;
