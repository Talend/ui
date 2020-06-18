import React from 'react';
import styled from 'styled-components';
import Label from '../Label';
import tokens from '../../../tokens';

const StyledDiv = styled.div(
	({ theme }) => `
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding-bottom: ${tokens.space.small};
	width: 100%;
  	min-width: 8rem;
  	max-width: 70rem;

	label {
		font-size: ${tokens.fontSizes.small};
		color: ${theme.colors.textColor};
	}

	${StyledField} {
		width: 100%;
	}
`,
);

const StyledFieldGroup = styled.div(
	({ theme }) => `
  display: inline-flex;
  align-items: center;
  width: 100%;

  svg, 
  button {
    margin: -3.2rem; 	
    padding: 0;
	width: ${tokens.sizes.smaller};
    height: ${tokens.sizes.smaller};
  }
  
  svg {
    fill: ${tokens.colors.darkSilver};
	pointer-events: none;
  }
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
	({ theme, as, type, multiple }) => `
  padding: 0 ${tokens.space.small};    
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
    
  color: ${theme.colors.inputColor};
  font-size: ${tokens.fontSizes.normal};
  background: ${theme.colors.inputBackgroundColor};
  border-radius: ${tokens.radii.inputBorderRadius};
  box-shadow: 0 0 0 1px ${theme.colors.inputBorderColor};
  
  ${
		['input', 'select'].includes(as) &&
		!['radio', 'checkbox'].includes(type) &&
		!multiple &&
		'height: 3.2rem;'
	} 	
   
  &::placeholder {
  	color: ${theme.colors.inputPlaceholderColor};
  	font-size: ${tokens.fontSizes.normal};
  }
   
  &:hover {
  	box-shadow: 0 0 0 1px  ${theme.colors.inputBorderHoverColor};
  }
  
  &:focus {
	box-shadow: 0 0 0 2px  ${theme.colors.inputBorderFocusColor};  	
  }
  
  &:disabled {
  	cursor: not-allowed;
  	opacity: ${tokens.opacity.disabled};
	box-shadow: 0 0 0 1px ${theme.colors.inputBorderDisabledColor};
  }
  
  &:read-only {
	box-shadow: 0 0 0 1px ${theme.colors.inputBorderDisabledColor};
  }
`,
);

const Field = React.forwardRef(({ label, after, icon, ...rest }, ref) => {
	const inline = ['checkbox', 'radio'].includes(rest.type);
	return (
		<StyledDiv inline={inline}>
			{label && !inline && <Label htmlFor={label}>{label}</Label>}
			{after ? (
				<StyledFieldGroup>
					<StyledField id={label} {...rest} ref={ref} /> {after}
				</StyledFieldGroup>
			) : (
				<div className={`input--${rest.as} ${rest.multiple ? 'input--multiple' : ''}`}>
					<StyledField id={label} {...rest} />{' '}
				</div>
			)}
			{label && inline && <Label htmlFor={label}>{label}</Label>}
		</StyledDiv>
	);
});

export default Field;
