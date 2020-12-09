import styled from 'styled-components';
import tokens from '../../tokens';

const ThemedSkeleton = styled.span(
	({ theme }) => `
    background: ${theme.colors.skeletonColor};
`,
);

export const Skeleton = styled(ThemedSkeleton).attrs({
	className: 'skeleton',
	'aria-hidden': true,
})`
	display: inline-flex;
	height: ${tokens.sizes.xl};
	width: 100%;
	border-radius: ${tokens.radii.rectRadius};
	cursor: progress;
	animation: 1.5s ${tokens.animations.heartbeat} ease infinite;
`;
