import React from 'react';
import styled from 'styled-components';

import Label from '../Label';

import tokens from '../../../tokens';

export const Field = styled.div(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding-bottom: ${tokens.space.m};
	width: 100%;
  	min-width: 8rem;
	color: ${theme.colors.textColor};

	label {
		font-size: ${tokens.fontSizes.small};
	}

	.field__group--loading {
		.field__control {
			padding-right: ${tokens.sizes.xxl};
		}
		
		.field__loading {
			position: absolute;
			top: 0;
			right: 0;
			left: auto;
			width: ${tokens.sizes.xxl};
			height: ${tokens.sizes.xxl};	
		}
	}
	
	.field__group--has-error {
		${FieldControl} {
			border-color: ${theme.colors.destructiveColor};
		}
	}
	
	textarea,
    select[multiple] {
		padding: 1rem;
	}
`,
);

export const FieldLabel = Label;

export const FieldGroup = styled.div(
	({ theme, after }) => `
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;

  ${
		after
			? ` input {
	padding-right: 3.6rem;
  }`
			: ''
	}

  svg, 
  button {
    position: absolute;
    padding: 0;
    height: ${tokens.sizes.l};
    z-index: 1;
  }
  
  svg {
  	left: 0;
	padding: 0 1rem;
    fill: ${tokens.colors.darkSilver};
	pointer-events: none;
	
	+ input {
		padding-left: 3.6rem;
	}
  }
  
  button {
  	right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: auto;
    border: none;
    
    svg {
	  position: static;
      margin:0;
    }
    
    &:hover {    
	  svg {
	    fill: ${theme.colors.activeColor}
      }
    }
  }
  
  @media all and (-ms-high-contrast:none) {
    input{
	  padding-right: inherit;
    }

    button,
    *::-ms-backdrop, button { display: none }
  }
`,
);

export const FieldControl = styled.div(
	({ theme, as, type, multiple }) => `
  padding: 0 ${tokens.space.s}; 
  width: 100%;
  color: ${theme.colors.inputColor};
  font-size: ${tokens.fontSizes.normal};   
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: ${theme.colors.inputBackgroundColor};
  border: 1px solid ${theme.colors.inputBorderColor};
  border-radius: ${tokens.radii.inputBorderRadius};
  
  ${
		['input', 'select'].includes(as) &&
		!['radio', 'checkbox'].includes(type) &&
		!multiple &&
		`height: ${tokens.sizes.xxl};`
	} 	
   
  &::placeholder {
  	font-size: ${tokens.fontSizes.normal};
  	color: ${theme.colors.inputPlaceholderColor};
  }
   
  &:hover {
  	border: 1px solid ${theme.colors.inputBorderHoverColor};
  }
  
  &:focus {
	border: 2px solid ${theme.colors.inputBorderFocusColor};  	
  }
  
  &:disabled {
	border: 1px solid ${theme.colors.inputBorderDisabledColor};
  	opacity: ${tokens.opacity.disabled};
  	cursor: not-allowed;
  }
  
  &:read-only {
  	border: 1px solid ${theme.colors.inputBorderDisabledColor};
  }
`,
);
