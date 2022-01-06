import styled from 'styled-components';
import Stepper from '../Stepper';

const StepperVertical = styled(Stepper).attrs({
	className: 'stepper--vertical',
	orientation: 'vertical',
})`
	justify-content: flex-end;
	width: 20rem;

	.stepper__steps {
		flex-direction: column;
	}

	.stepper__step {
		flex-direction: column;
		align-items: flex-end;

		&:not(:last-child) {
			margin-bottom: 5rem;
		}
	}
`;

export default StepperVertical;
