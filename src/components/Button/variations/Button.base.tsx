import React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonBase: React.FC<ButtonProps> = styled(Button)(
	({ theme }) => `
		padding: ${tokens.space.none} ${tokens.space.l};
		min-height: ${tokens.sizes.xxl};
        color: ${theme.colors.textColor};
        border: ${tokens.borders.normal};
        border-radius: ${tokens.radii.rectRadius};
    	transition: all 0.2s;

        &:not([aria-disabled='true']):hover {
            background-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
            border-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
        }
    
        &:not([aria-disabled='true']):active {
            background-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
            border-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
        }
    
        &[aria-disabled='true'] {
            color: ${theme.colors.buttonDisabledColor};
            background-color: ${theme.colors.buttonDisabledBackgroundColor};
            border-color: ${theme.colors.buttonDisabledBackgroundColor};
        }
`,
);

export default ButtonBase;
