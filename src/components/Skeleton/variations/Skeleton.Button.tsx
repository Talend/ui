import styled from 'styled-components';

import Skeleton from '../Skeleton';

const ButtonSkeleton = styled(Skeleton).attrs({
	className: 'btn btn--skeleton',
})<{ small: boolean }>`
	height: ${({ small }) => (small ? '2rem' : '3rem')};
	width: ${({ small }) => (small ? '8rem' : '10rem')};
`;

export default ButtonSkeleton;
