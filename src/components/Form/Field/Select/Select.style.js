import styled from 'styled-components';

import tokens from '../../../../tokens';

export const FieldWrapper = styled.div(
	({ theme }) => `
		position: relative;

		.field__group--select {
			position: relative;

			.talend-caret-down {
				position: absolute;
				top: auto;
				left: auto;
				right: 0;
				width: ${tokens.sizes.s};
				color: ${theme.colors.inputPlaceholderColor};
				pointer-events: none;
			}

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
	
				select {
					padding-right: ${tokens.sizes.xxl};
					appearance: none;
					
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
