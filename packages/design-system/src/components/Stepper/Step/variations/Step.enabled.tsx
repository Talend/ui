import React from 'react';
import styled from 'styled-components';
import Step from '../Step';
import tokens from '../../../../tokens';

const StepEnabled = styled(Step).attrs({ className: 'step--enabled' })`
	.step__icon {
		background: radial-gradient(
				${tokens.space.s} ${tokens.space.s} at ${tokens.space.s} ${tokens.space.s},
				${({ theme }) => theme.colors?.activeColor[100]} 50%,
				transparent 50%
			),
			radial-gradient(
				${tokens.sizes.m} ${tokens.sizes.m} at ${tokens.space.s} ${tokens.space.s},
				${({ theme }) => theme.colors?.activeColor[500]} 50%,
				transparent 50%
			);
	}
`;

export default React.memo(StepEnabled);
