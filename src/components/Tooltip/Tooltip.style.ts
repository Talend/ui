import styled from 'styled-components';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipReference as ReakitTooltipReference,
} from 'reakit';

import tokens from '../../tokens';

export const Tooltip = styled(ReakitTooltip)(
	({ theme }) => `
	max-width: 25rem;
	padding: ${tokens.space.none} ${tokens.space.s};
	font-family: ${tokens.fonts.sansSerif};
	font-size:${tokens.fontSizes.small};
	color: ${theme.colors.tooltipColor};
	background: ${theme.colors.tooltipBackgroundColor};
	border: 1px solid ${theme.colors.tooltipBackgroundColor};
	border-radius: ${tokens.radii.rectRadius};
	z-index: ${tokens.zIndices.tooltips};
`,
);

export const TooltipReference = styled(ReakitTooltipReference)``;

export const TooltipArrow = styled(ReakitTooltipArrow)(
	({ theme }) => `
	color: ${theme.colors.tooltipBackgroundColor};

	svg {
		fill: currentColor;
	}
`,
);
