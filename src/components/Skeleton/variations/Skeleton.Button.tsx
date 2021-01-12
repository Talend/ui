import React from 'react';
import styled from 'styled-components';
import Skeleton from '../Skeleton';

const ButtonSkeleton = styled(Skeleton)<{ small: boolean }>(
	({ theme, small }) => `
	height: ${small ? '2rem' : '3rem'};
    width: ${small ? '8rem' : '10rem'};
`,
);

export default ButtonSkeleton;
