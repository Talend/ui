import React from 'react';
import styled, { StyledFunction } from 'styled-components';

import Skeleton from '../Skeleton';

type ButtonSkeletonTypes = {
	small?: boolean;
};

const StyledSkeleton: StyledFunction<React.FC<ButtonSkeletonTypes>> = styled(Skeleton);

const ButtonSkeleton: React.FC<ButtonSkeletonTypes> = StyledSkeleton.attrs(
	({ small = false }: ButtonSkeletonTypes) => ({
		className: 'btn btn--skeleton',
		small,
	}),
)<ButtonSkeletonTypes>`
	height: ${({ small }) => (small ? '2rem' : '3rem')};
	width: ${({ small }) => (small ? '8rem' : '10rem')};
`;

ButtonSkeleton.displayName = 'Skeleton.Button';

export default ButtonSkeleton;
