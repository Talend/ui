import React from 'react';
import styled from 'styled-components';
import Skeleton from '../../../Skeleton';
import tokens from '../../../../tokens';
import { StepProps } from '../Step';

const StepSkeletonWrapper = styled.span.attrs({ className: 'step--skeleton' })`
	position: relative;
	width: 11.5rem;

	&:before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: ${({ theme }) => theme.colors?.backgroundColor};
		border-radius: ${tokens.radii.rectRadius};
	}
`;

const StepSkeleton = (props: StepProps) => (
	<StepSkeletonWrapper {...props}>
		<Skeleton variant="heading" size="M" />
	</StepSkeletonWrapper>
);

export default React.memo(StepSkeleton);
