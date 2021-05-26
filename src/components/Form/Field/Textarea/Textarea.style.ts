import styled from 'styled-components';

import tokens from '../../../../tokens';

export const Textarea = styled.textarea`
	padding: ${tokens.space.s};
	line-height: ${tokens.lineHeights.textarea};
	min-height: 9.6rem;
	resize: vertical;
	white-space: initial;
	overflow: auto;
`;
