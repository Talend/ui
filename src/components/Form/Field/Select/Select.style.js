import styled from 'styled-components';

import tokens from '../../../../tokens';

export const FieldWrapper = styled.div`
	position: relative;

	.field__group--select {
		position: relative;

		.talend-caret-down {
			position: absolute;
			top: auto;
			left: auto;
			right: 0;
			width: ${tokens.sizes.s};
			color: ${({ theme }) => theme.colors.inputPlaceholderColor};
			pointer-events: none;
		}

		select {
			overflow: auto;
			cursor: pointer;
			border-color: ${({ theme }) => theme.colors.inputBorderColor};
			background: ${({ theme }) => theme.colors.inputBackgroundColor};
		}

		&:hover {
			select:not(:disabled) {
				border: 1px solid ${({ theme }) => theme.colors.inputHoverBorderColor};
			}
		}
		&:not(.field__group--multiple) {
			select {
				padding-right: ${tokens.sizes.xxl};
				appearance: none;

				&:disabled {
					border: 1px solid ${({ theme }) => theme.colors.inputDisabledBorderColor};
					opacity: ${tokens.opacity.disabled};
					cursor: not-allowed;
				}
			}
		}
	}
`;
