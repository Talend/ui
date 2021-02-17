import styled from 'styled-components';
import { shade } from 'polished';

import tokens from '../../tokens';

export const SwitchIndicator = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	bottom: 0;
	transition: ${tokens.transitions.fast};
	z-index: ${tokens.zIndices.above};
`;

export const Switch = styled.div<{ disabled: boolean; readOnly: boolean }>`
	div {
		position: relative;
    	display: inline-flex;
		background: ${({ theme }) => theme.colors.inputRadioBackgroundColor};
		border-radius: 10rem;
		box-shadow: inset 0 .1rem .3rem 0 rgba(0, 0, 0, .25);
		overflow: hidden;
    	${({ disabled }) => (disabled ? `opacity: ${tokens.opacity.disabled};` : '')}
	}
	
	button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 0;
		padding: 0 1rem;
		color: ${({ theme }) => theme.colors.textColor}
		font-size: ${tokens.fontSizes.small};
    	opacity: ${tokens.opacity.disabled};
		user-select: none; 		
		cursor: pointer;
		background: none;
		border: none;
		z-index: ${tokens.zIndices.onTop};
	}
	
	${SwitchIndicator} em {
  		position: absolute;
  		top: .2rem;
		right: .2rem;
  		bottom: .2rem;
  		left: .2rem;
		transition: background .3s;
		background: ${({ theme }) => theme.colors.activeColor[500]};    
    	border-radius: 100px;
  	}

	div:hover ${SwitchIndicator} em {
		background: ${({ readOnly, theme }) =>
			!readOnly ? shade(0.25, theme.colors.activeColor[500]) : 'none'};
	}
  
	[aria-selected] {
		transition: color ${tokens.transitions.normal};
	}
	
	[aria-selected="true"] {
		color: ${({ theme }) => theme.colors.inputBackgroundColor};
		opacity: ${tokens.opacity.opaque};
	}
		
	[aria-selected] ~ ${SwitchIndicator} {
		visibility: hidden;
	}
	
	[aria-selected="true"] ~ ${SwitchIndicator} {
		visibility: visible;
	}
`;
