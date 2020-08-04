import * as React from 'react';
import styled from 'styled-components';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipReference as ReakitTooltipReference,
} from 'reakit/Tooltip';
import tokens from '../../tokens';

export const Tooltip = styled(ReakitTooltip)(
	({ theme }) => `
	max-width: 25rem;
	padding-left: ${tokens.space.s};
	padding-right: ${tokens.space.s};
	font-size: 1.2rem;
	color: ${theme.colors.tooltipColor};
	background: ${theme.colors.tooltipBackgroundColor};
	border-radius: ${tokens.radii.rectRadius};
	z-index: ${tokens.zIndices.tooltips};
`,
);

export const TooltipReference = styled(ReakitTooltipReference)`
	display: inline-block;
`;

export const TooltipArrow = styled(ReakitTooltipArrow)(
	({ theme }) => `
	svg {
		fill: ${theme.colors.tooltipBackgroundColor};
	}
`,
);
