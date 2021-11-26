import React from 'react';
import styled from 'styled-components';
import Step from '../Step';
import tokens from '../../../../tokens';

const StepValidated = styled(Step).attrs({
	className: 'step--validated',
})`
	.step__icon {
		background: radial-gradient(
			${tokens.sizes.s} ${tokens.sizes.s} at ${tokens.space.s} ${tokens.space.s},
			${({ theme }) => theme.colors?.activeColor[500]} 50%,
			transparent 50%
		);
	}
`;

export default React.memo(StepValidated);
