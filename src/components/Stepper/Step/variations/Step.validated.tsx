import React from 'react';
import styled from 'styled-components';
import Step from '../Step';
import tokens from '../../../../tokens';

const StepValidated = styled(Step).attrs({
	icon: 'talend-check-circle',
	className: 'step--validated',
})`
	.tc-svg-icon {
		fill: ${({ theme }) => theme.colors?.activeColor[500]};
		height: ${tokens.space.l};
		width: ${tokens.space.l};
	}
`;

export default React.memo(StepValidated);
