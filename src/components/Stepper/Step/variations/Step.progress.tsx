import React from 'react';
import styled from 'styled-components';
import Step from '../Step';
import tokens from '../../../../tokens';

const StepInProgress = styled(Step).attrs({
	className: 'step--in-progress',
})`
	color: ${({ theme }) => theme.colors?.activeColor[500]};
	font-weight: ${tokens.fontWeights.semiBold};

	.step__icon {
		display: block;
		height: ${tokens.space.l};
		width: ${tokens.space.l};
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
	}
`;

export default React.memo(StepInProgress);
