import styled from 'styled-components';
import tokens from '../../tokens';

const ThemedSkeleton = styled.span`
	background: ${({ theme }) => theme.colors.skeletonBackgroundColor};
`;

export const Skeleton = styled(ThemedSkeleton).attrs({
	className: 'skeleton',
	'aria-hidden': true,
})`
	display: inline-flex;
	height: ${tokens.sizes.xl};
	width: 100%;
	border-radius: ${tokens.radii.rectRadius};
	cursor: progress;
	animation: ${tokens.animations.heartbeat};
`;

Skeleton.displayName = 'Skeleton';
