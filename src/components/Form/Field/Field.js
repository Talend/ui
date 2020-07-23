import React from 'react';
import styled from 'styled-components';
import Label from '../Label';
import tokens from '../../../tokens';
import Loading from '../../Loading';

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

	${StyledField}, 
	.input {
		width: 100%;
	}
	
	.input {
		&--loading {
			position: relative;	
			
			${StyledField} {
				padding-right: 3.2rem;
			}
			
			.loading {
				position: absolute;
				top: 0;
				right: 0;
				width: 3.2rem;
    			height: 3.2rem;	
			}
		}
	}
	
	textarea,
    select[multiple] {
		padding: 1rem;
	}
`,
);

const StyledFieldGroup = styled.div(
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
    height: ${tokens.sizes.smaller};
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

const StyledField = styled.div(
	({ theme, as, type, multiple }) => `
  padding: 0 ${tokens.space.small};    
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
    
  color: ${theme.colors.inputColor};
  font-size: ${tokens.fontSizes.normal};
  background: ${theme.colors.inputBackgroundColor};
  border: 1px solid ${theme.colors.inputBorderColor};
  border-radius: ${tokens.radii.inputBorderRadius};
  
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
  	border: 1px solid ${theme.colors.inputBorderHoverColor};
  }
  
  &:focus {
	border: 2px solid ${theme.colors.inputBorderFocusColor};  	
  }
  
  &:disabled {
  	cursor: not-allowed;
  	opacity: ${tokens.opacity.disabled};
	border: 1px solid ${theme.colors.inputBorderDisabledColor};
  }
  
  // FIXME because select
  // &:read-only {
  // 	border: 1px solid ${theme.colors.inputBorderDisabledColor};
  // }
`,
);

const Field = React.forwardRef(({ label, before, after, loading, ...rest }, ref) => {
	const inline = ['checkbox', 'radio'].includes(rest.type);
	return (
		<StyledDiv
			className={`field ${typeof rest.as === 'string' ? `field--${rest.as}` : ''}`}
			inline={inline}
		>
			{label && !inline && (
				<Label className="label" htmlFor={label}>
					{label}
				</Label>
			)}
			{before || after ? (
				<StyledFieldGroup after={after}>
					{before} <StyledField id={label} {...rest} ref={ref} />
					{loading && <Loading />} {after}
				</StyledFieldGroup>
			) : (
				<div
					className={`input ${typeof rest.as === 'string' ? `input--${rest.as}` : ''} ${
						rest.multiple ? 'input--multiple' : ''
					} ${loading ? 'input--loading' : ''}`}
				>
					<StyledField id={label} {...rest} />
					{loading && <Loading className="loading" />}
				</div>
			)}
			{label && inline && <Label htmlFor={label}>{label}</Label>}
		</StyledDiv>
	);
});

export default Field;
