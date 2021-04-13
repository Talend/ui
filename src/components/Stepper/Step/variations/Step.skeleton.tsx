import React from 'react';
import styled from 'styled-components';
import Skeleton from '../../../Skeleton';
import tokens from '../../../../tokens';

const StepSkeleton = styled(Skeleton).attrs({ className: 'step--skeleton' })`
	height: ${tokens.space.l};
	width: 11.5rem;
`;

export default React.memo(StepSkeleton);
