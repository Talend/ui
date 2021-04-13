import React from 'react';
import styled from 'styled-components';
import Step from '../Step';
import tokens from '../../../../tokens';

const StepDisabled = styled(Step).attrs({ className: 'step--disabled' })`
	color: ${({ theme }) => theme.colors?.grayColor[900]};

	&:before,
	.step__title {
		opacity: ${tokens.opacity.disabled};
	}

	.step__icon {
		display: block;
		height: ${tokens.space.l};
		width: ${tokens.space.l};
		background: radial-gradient(
			${tokens.space.l} ${tokens.space.l} at ${tokens.space.s} ${tokens.space.s},
			${({ theme }) => theme.colors?.grayColor[100]} 50%,
			transparent 50%
		);
	}
`;

export default React.memo(StepDisabled);
