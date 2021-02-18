import styled from 'styled-components';

import tokens from '../../tokens';
import { ellipsis } from '../ThemeProvider/mixins';

export const Tag = styled.span.attrs({
	className: 'tag',
})`
	display: inline-block;
	padding: ${tokens.space.none} ${tokens.space.xs};
	max-width: 15rem;
	font-family: ${tokens.fonts.sansSerif};
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
	line-height: ${tokens.lineHeights.normal};
	border-radius: ${tokens.radii.inputBorderRadius};
	vertical-align: middle;
	${ellipsis};

	color: ${props => props.theme.colors.tagDefaultColor};
	background-color: ${props => props.theme.colors.tagDefaultBackgroundColor};
`;
