import styled from 'styled-components';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipReference as ReakitTooltipReference,
} from 'reakit';

import tokens from '../../tokens';

export const Tooltip = styled(ReakitTooltip)`
	max-width: 25rem;
	padding: ${tokens.space.none} ${tokens.space.s};
	font-family: ${tokens.fonts.sansSerif};
	font-size: ${tokens.fontSizes.small};
	border-radius: ${tokens.radii.rectRadius};
	z-index: ${tokens.zIndices.tooltip};
	color: ${({ theme }) => theme.colors?.tooltipColor};
	background: ${({ theme }) => theme.colors?.tooltipBackgroundColor};
`;

export const TooltipReference = styled(ReakitTooltipReference)``;

export const TooltipArrow = styled(ReakitTooltipArrow)`
	color: ${({ theme }) => theme.colors?.tooltipBackgroundColor};

	svg {
		display: block;
		margin: -1px;
		vertical-align: middle;
		fill: currentColor;
	}
`;
