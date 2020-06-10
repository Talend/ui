import React from 'react';
import styled from 'styled-components';
import Label from '../Label';

import tokens from '../../../tokens';

const StyledDiv = styled.div(
	({ theme, inline }) => `
	display: flex;
	padding-bottom: 1rem;
	${
		!inline
			? `
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		
		${StyledField} {
			width: 100%
		}
	`
			: `
		align-items: center;
		justify-content: flex-end;
		flex-direction: row-reverse;
		
		label {
		  padding: 0 1rem;
		}
	`
	}
	color: ${theme.colors.textColor};
`,
);

const StyledFieldGroup = styled.div(
	({ theme }) => `
  display: inline-flex;
  align-items: center;
  
  input {
  	min-width: 8rem;
  	max-width: 70rem;
  	padding-right: 2rem;
  }}
  
  svg, 
  button {
    margin: -2rem; 	
    padding: 0;
	width: ${tokens.sizes.medium};
    height: ${tokens.sizes.medium};
  }
  
  svg {
    fill: ${tokens.colors.darkSilver};
  }
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: auto;
    border: none;
    
    svg {
      margin:0;
    }
    
    &:focus {
      outline: none;
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

const StyledField = styled.div(
	({ theme }) => `
  padding: 0 1rem;    
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  background: ${theme.colors.backgroundColor};
  border-radius: ${theme.borders.inputBorderRadius};
  box-shadow: 0 0 0 1px ${theme.colors.inputBorderColor};
  
  &:hover {
  	box-shadow: 0 0 0 1px  ${theme.colors.inputBorderHoverColor};
  }
  
  &:focus {
	box-shadow: 0 0 0 2px  ${theme.colors.inputBorderFocusColor};  	
  }
`,
);

function Field({ label, after, icon, ...rest }) {
	return (
		<StyledDiv inline={['checkbox', 'radio'].includes(rest.type)}>
			{label && <Label htmlFor={label}>{label}</Label>}
			{after ? (
				<StyledFieldGroup>
					<StyledField id={label} {...rest} />
					{after}
				</StyledFieldGroup>
			) : (
				<StyledField id={label} {...rest} />
			)}
		</StyledDiv>
	);
}

export default Field;
