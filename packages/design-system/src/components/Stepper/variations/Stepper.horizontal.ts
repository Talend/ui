import styled from 'styled-components';
import Stepper from '../Stepper';

const StepperHorizontal = styled(Stepper).attrs({
	className: 'stepper--horizontal',
	orientation: 'horizontal',
})`
	.stepper__step {
		width: 20rem;
		justify-content: center;
	}

	.step {
		position: relative;
		width: 20rem;
		padding-top: 3rem;

		&__icon {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}
`;

export default StepperHorizontal;
