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

const StyledField = styled.div(
	({ theme }) => `
  background: ${theme.colors.backgroundColor};
  border: 2px solid ${theme.colors.textColor};
  
  &:focus {
  	border: 2px solid ${theme.colors.activeColor};  	
  }
`,
);

function Field({ label, ...rest }) {
	return (
		<StyledDiv inline={['checkbox', 'radio'].includes(rest.type)}>
			{label && <Label htmlFor={label}>{label}</Label>}
			<StyledField id={label} {...rest} />
		</StyledDiv>
	);
}

export default Field;
