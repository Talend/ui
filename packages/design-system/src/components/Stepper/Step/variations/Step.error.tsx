import React from 'react';
import styled from 'styled-components';
import Step from '../Step';

const StepError = styled(Step).attrs({
	icon: 'talend-cross-circle',
	className: 'step--error',
})`
	.step__icon > .tc-svg-icon {
		fill: ${({ theme }) => theme.colors?.destructiveColor[500]};
	}
`;

export default React.memo(StepError);
