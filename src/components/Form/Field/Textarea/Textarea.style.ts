import styled from 'styled-components';
import tokens from '../../../../tokens';

export const Textarea = styled.textarea`
	padding: 1rem;
	line-height: ${tokens.lineHeights.textarea};
	min-height: 9.6rem;
	resize: vertical;
	white-space: initial;
	overflow: auto;
`;
