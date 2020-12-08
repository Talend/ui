import styled from 'styled-components';
import Button from '../Button';

export const IconButton = styled(Button.Icon)(
	({ theme }) => `
		&.btn--is-active {
			color: ${theme.colors.buttonPrimaryColor};
			background-color: ${theme.colors.buttonPrimaryBackgroundColor};
			border: 1px solid ${theme.colors.buttonPrimaryBackgroundColor};
				
			&:hover,
			&:active {
				color: ${theme.colors.buttonPrimaryColor};
			}
					
			&:hover {
				background-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
				border-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
			}
				
			&:active {
				background-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
				border-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
			}
			
			&[aria-disabled='true'] {
				color: ${theme.colors.buttonDisabledBackgroundColor};
				background-color: ${theme.colors.buttonDisabledColor};
				border-color: ${theme.colors.buttonDisabledColor};
			}
		}
`,
);
