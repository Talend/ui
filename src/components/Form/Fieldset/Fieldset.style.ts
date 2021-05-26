import styled from 'styled-components';
import tokens from '../../../tokens';

export const Fieldset = styled.fieldset`
	padding: ${tokens.space.none};
	border: none;
`;

export const Legend = styled.legend`
	color: ${({ theme }) => theme.colors.textColor};
	font-weight: ${tokens.fontWeights.bold};
	padding: ${tokens.space.m} 0;
`;
