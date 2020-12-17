import React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button';
import tokens from '../../../tokens';

const ButtonBase: React.FC<ButtonProps> = styled(Button)(
	({ theme }) => `
		padding: ${tokens.space.none} ${tokens.space.m};
		min-height: ${tokens.sizes.xxl};
        color: ${theme.colors.textColor};
        border: ${tokens.borders.normal};
        border-radius: ${tokens.radii.rectRadius};
    	transition: ${tokens.transitions.fast};
    	
		&[aria-disabled='true'],
		&[aria-busy='true'] {
			
			&,
			&:hover,
			&:active {
				color: ${theme.colors.buttonDisabledColor};
				background-color: ${theme.colors.buttonDisabledBackgroundColor};
				border-color: ${theme.colors.buttonDisabledBackgroundColor};
			}
		}
		
		&[aria-disabled='true'] {
			cursor: not-allowed;
		}
		
		&[aria-busy='true'] {
			cursor: progress;
		}
`,
);

export default ButtonBase;
