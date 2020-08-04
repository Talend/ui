import styled from 'styled-components';

import CaretSVG from '../../../../icons/caret.svg';

import tokens from '../../../../tokens';

export const FieldWrapper = styled.div(
	({ theme }) => `
		.field__group--select {
			position: relative;
		
			select {
				overflow: auto;
				cursor: pointer;
				border-color: ${theme.colors.inputBorderColor};
			}
			
			&:hover {
				select:not(:disabled) {
					border: 1px solid ${theme.colors.inputBorderHoverColor};
				}
			}			
			
			&:not(.field__group--multiple) {
				&:after {
					display: flex;
					content: '';
					top: 0;
					bottom: 0;
					right: 0;
					position: absolute;
					width: ${tokens.sizes.s};
					margin: 0 1rem;
					mask-repeat: no-repeat;
					mask-position: center;
					background-color: ${theme.colors.inputPlaceholderColor};
					mask-image: url(${CaretSVG});
					pointer-events: none;
				}
	
				select {
					padding-right: 3.2rem;
					appearance: none;
					
					&:hover {
						&:after  {
							background-color: ${theme.colors.inputBorderFocusColor};
						}
					}

					&:disabled {
						border: 1px solid ${theme.colors.inputBorderDisabledColor};
						opacity: ${tokens.opacity.disabled};
						cursor: not-allowed;
					}
				}
			}
		}
`,
);
