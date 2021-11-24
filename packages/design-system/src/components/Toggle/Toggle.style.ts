import styled from 'styled-components';
import tokens from '../../tokens';
import Button from '../Button';

export const Toggle = styled(Button.Icon)`
	&& {
		border: ${tokens.borders.normal};
	}

	&.btn--is-active {
		--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryColor};
		--t-button-background-color: ${({ theme }) => theme.colors?.buttonPrimaryBackgroundColor};
		--t-button-border-color: ${({ theme }) => theme.colors?.buttonPrimaryBackgroundColor};

		&:hover,
		&:active {
			--t-button-color: ${({ theme }) => theme.colors?.buttonPrimaryColor};
		}

		&:hover {
			--t-button-background-color: ${({ theme }) =>
				theme.colors?.buttonPrimaryHoverBackgroundColor};
			--t-button-border-color: ${({ theme }) => theme.colors?.buttonPrimaryHoverBackgroundColor};
		}

		&:active {
			--t-button-background-color: ${({ theme }) =>
				theme.colors?.buttonPrimaryActiveBackgroundColor};
			--t-button-border-color: ${({ theme }) => theme.colors?.buttonPrimaryActiveBackgroundColor};
		}

		&[aria-disabled='true'] {
			--t-button-color: ${({ theme }) => theme.colors?.buttonDisabledBackgroundColor};
			--t-button-background-color: ${({ theme }) => theme.colors?.buttonDisabledColor};
			--t-button-border-color: ${({ theme }) => theme.colors?.buttonDisabledColor};
		}
	}
`;
