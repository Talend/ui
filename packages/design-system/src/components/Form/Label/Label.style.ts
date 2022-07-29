import styled from 'styled-components';

import tokens from '../../../deprecatedTokens';

export const Label = styled.label<{ disabled: boolean }>`
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
	color: ${({ theme, disabled }) =>
		disabled ? theme.colors.inputDisabledBorderColor : theme.colors.textColor};
	cursor: pointer;
`;
