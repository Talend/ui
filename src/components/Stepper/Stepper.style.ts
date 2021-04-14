import styled from 'styled-components';

export const Stepper = styled.ol.attrs({
	className: 'stepper',
})`
	display: flex;
	flex-direction: column;
	width: 20rem;
	overflow: hidden;
`;

export const StepperStep = styled.li.attrs({
	className: 'stepper__step',
})`
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-end;

	.step {
		z-index: 1;
	}

	.stepper__progress-bar {
		position: relative;
		margin-right: 0.9rem;
		width: 0.2rem;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23d2d2d2' stroke-width='4' stroke-dasharray='0%25%2c40%25' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	}

	&:not(:first-child) .stepper__progress-bar {
		height: 5rem;
	}

	.step--in-progress + .stepper__progress-bar:after {
		content: '';
		position: absolute;
		height: 99999px;
		width: 0.2rem;
		bottom: 0;
		background: ${({ theme }) => theme.colors?.activeColor[500]};
	}
`;
