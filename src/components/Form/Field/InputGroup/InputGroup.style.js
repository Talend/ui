import React from 'react';
import styled from 'styled-components';

import tokens from '../../../../tokens';

export const InputGroup = styled.div(
	({ theme }) => `
		display: flex;
		flex-direction: column;
	
		.input-group__item--input {
			flex: 1;
		}
	
		.field__label {
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}
	
		.field__control--select {
			color: ${theme.colors.inputGroupInteractiveColor};
			background: ${theme.colors.inputGroupInteractiveBackgroundColor};
		}
	
		.input-group__item--suffix .field__control--select,
		&.input-group--has-prefix .input-group__item--input .field__control {
			border-left: none;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		
		.input-group__item--prefix .field__control--select,
		 &.input-group--has-suffix .input-group__item--input .field__control {
			border-right: none;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		
		.input-group__item--prefix .field__group--select:not(.field__group--multiple):hover .field__control--select:not(:disabled) {
			border-right: none;
		 }	
		 
		.input-group__item--suffix .field__group--select:not(.field__group--multiple):hover .field__control--select:not(:disabled) {
			border-left: none;		
		}	
		
		&:hover {
			${Span},
			.input-group__item .field__control {
				border-color: ${theme.colors.inputBorderHoverColor};
			}
		}
`,
);
export const InputGroupLabel = styled.span(
	({ theme }) => `
		font-size: ${tokens.fontSizes.small};
		color: ${theme.colors.textColor};
`,
);
export const InputGroupRow = styled.div`
	display: flex;
`;
export const Span = styled.span(
	({ theme }) => `
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		height: ${tokens.sizes.xxl};
		color: ${theme.colors.inputGroupColor};
		background: ${theme.colors.inputGroupBackgroundColor};
		border: 1px solid ${theme.colors.inputBorderColor};
`,
);
export const SpanPrefix = styled(Span)`
	border-right: none;
	border-top-left-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-left-radius: ${tokens.radii.inputBorderRadius};
`;
export const SpanSuffix = styled(Span)`
	border-left: none;
	border-top-right-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-right-radius: ${tokens.radii.inputBorderRadius};
`;
