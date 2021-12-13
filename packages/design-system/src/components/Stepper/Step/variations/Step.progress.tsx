import React from 'react';
import styled, { keyframes, ThemeProps } from 'styled-components';
import Step from '../Step';
import tokens from '../../../../tokens';

const pulse = ({ theme }: ThemeProps<any>) => keyframes`
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 ${theme.colors?.activeColor[100]};
	}

	80% {
		transform: scale(1);
		box-shadow: 0 0 0 .5rem rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`;

const StepInProgress = styled(Step).attrs({
	className: 'step--in-progress',
	active: true,
})`
	color: ${({ theme }) => theme.colors?.activeColor[500]};
	font-weight: ${tokens.fontWeights.semiBold};

	.step__icon {
		background: radial-gradient(
				1.2rem 1.2rem at ${tokens.space.s} ${tokens.space.s},
				${({ theme }) => theme.colors?.activeColor[500]} 50%,
				transparent 50%
			),
			radial-gradient(
				${tokens.space.l} ${tokens.space.l} at ${tokens.space.s} ${tokens.space.s},
				${({ theme }) => theme.colors?.activeColor[100]} 50%,
				transparent 50%
			);
		border-radius: 50%;
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		transform: scale(1);
		animation: ${pulse} 2s infinite;
	}
`;

export default React.memo(StepInProgress);
