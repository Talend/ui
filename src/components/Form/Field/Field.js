import React from 'react';
import styled from 'styled-components';
import Label from '../Label';

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
  	padding-right: 3rem;
  }
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -3rem;
    padding: 0;
    width: 3rem;
    height: 3rem;
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
`,
);

const StyledField = styled.div(
	({ theme }) => `
  padding: 0 1rem;    
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${theme.colors.backgroundColor};
  border: 2px solid ${theme.colors.textColor};
  
  &:focus {
  	border: 2px solid ${theme.colors.activeColor};  	
  }
`,
);

function Field({ label, button, ...rest }) {
	return (
		<StyledDiv inline={['checkbox', 'radio'].includes(rest.type)}>
			{label && <Label htmlFor={label}>{label}</Label>}
			{button ? (
				<StyledFieldGroup>
					<StyledField id={label} {...rest} />
					{button}
				</StyledFieldGroup>
			) : (
				<StyledField id={label} {...rest} />
			)}
		</StyledDiv>
	);
}

export default Field;
