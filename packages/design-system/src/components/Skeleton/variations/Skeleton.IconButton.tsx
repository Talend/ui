import styled from 'styled-components';

import ButtonSkeleton from './Skeleton.Button';

import tokens from '../../../tokens';

const IconButtonSkeleton = styled(ButtonSkeleton)`
	width: 3rem;
	border-radius: ${tokens.radii.roundedRadius};
`;

IconButtonSkeleton.displayName = 'Skeleton.Icon';

export default IconButtonSkeleton;
