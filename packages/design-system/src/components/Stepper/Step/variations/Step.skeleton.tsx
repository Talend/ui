import React from 'react';
import styled from 'styled-components';
import Skeleton from '../../../Skeleton';
import tokens from '../../../../tokens';
import { StepProps } from '../Step';

const StepSkeletonWrapper = styled.span.attrs({ className: 'step--skeleton' })`
	position: relative;

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

	&,
	.skeleton {
		height: ${tokens.space.l};
		width: 11.5rem;
	}
`;

const StepSkeleton = (props: StepProps) => (
	<StepSkeletonWrapper {...props}>
		<Skeleton />
	</StepSkeletonWrapper>
);

export default React.memo(StepSkeleton);
