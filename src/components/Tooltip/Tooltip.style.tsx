import * as React from 'react';
import styled from 'styled-components';
import {
	Tooltip as ReakitTooltip,
	TooltipArrow as ReakitTooltipArrow,
	TooltipReference as ReakitTooltipReference,
} from 'reakit/Tooltip';
import tokens from '../../tokens';

export const Tooltip = styled(ReakitTooltip)`
	max-width: 25rem;
	padding-left: ${tokens.space.smaller};
	padding-right: ${tokens.space.smaller};
	font-size: 1.2rem;
	color: ${tokens.colors.gray0};
	background: ${tokens.colors.gray700};
	border-radius: ${tokens.radii.rectRadius};
	z-index: ${tokens.zIndices.tooltips};
`;

export const TooltipReference = styled(ReakitTooltipReference)`
	display: inline-block;
`;

export const TooltipArrow = styled(ReakitTooltipArrow)`
	svg {
		fill: ${tokens.colors.gray700};
	}
`;
