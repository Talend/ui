import styled from 'styled-components';

import tokens from '../../tokens';

export const InlineMessage = styled.div`
	${props => props.withBackground || 'display: inline;'}
`;
export const Paragraph = styled.p`
	${props => props.icon && props.withBackground && 'padding: 0 0.5rem;'}
`;
export const Strong = styled.strong``;
export const Span = styled.span``;
export const IconSpan = styled(Span)`
	margin-right: 0.5rem;

	svg {
		display: inline;
		height: ${tokens.sizes.smaller};
		width: ${tokens.sizes.smaller};

		path {
			fill: currentColor;
		}
	}
`;
export const TextSpan = styled(Span)`
	${({ theme, withBackground }) =>
		`color: ${withBackground ? tokens.colors.gray900 : theme.colors.textColor};`}
`;
