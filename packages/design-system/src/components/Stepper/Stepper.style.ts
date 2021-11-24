import styled from 'styled-components';
import Progress from './Progress';

export const Stepper = styled.div.attrs({
	className: 'stepper',
})`
	position: relative;
	display: inline-flex;
`;

export const StepperProgressBar = styled(Progress).attrs({
	className: 'stepper__progress-bar',
})``;

export const StepperSteps = styled.ol.attrs({
	className: 'stepper__steps',
})`
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const StepperStep = styled.li.attrs({
	className: 'stepper__step',
})`
	display: flex;

	.step {
		align-items: center;
		justify-content: center;
		z-index: 1;
	}
`;
