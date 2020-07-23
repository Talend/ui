import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import tokens from '../../../../tokens';

export const InputGroup = styled.div(
	({ theme }) => `
	display: flex;
	flex-direction: column;

	label {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.input-group__item--input {
		flex: 1;
	}

	.select {
		font-weight: ${tokens.fontWeights.semibold};
		color: ${theme.colors.primaryColor};
		background: ${tint(0.9, theme.colors.primaryColor)};
	}

	.input-group__item--suffix .select,
	&.input-group--has-prefix .input-group__item--input .input > * {
		border-left: none;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.input-group__item--prefix .select,
	&.input-group--has-suffix .input-group__item--input .input > * {
		border-right: none;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`,
);
export const InputGroupLabel = styled.span`
	font-size: ${tokens.fontSizes.small};
`;
export const InputGroupRow = styled.div`
	display: flex;
`;

export const Span = styled.span(
	({ theme }) => `
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;
	height: 3.2rem;
	color: ${theme.colors.inputGroupColor};
	background: ${theme.colors.inputGroupBackgroundColor};
	border: 1px solid ${theme.colors.inputBorderColor};
`,
);
export const SpanPrefix = styled(Span)(
	({ theme }) => `
	border-right: none;
	border-top-left-radius: ${tokens.radii.inputBorderRadius};
	border-bottom-left-radius: ${tokens.radii.inputBorderRadius};
`,
);
export const SpanSuffix = styled(Span)(
	({ theme }) => `
	border-left: none;
	border-top-right-radius: ${tokens.radii.inputBorderRadius}; 
	border-bottom-right-radius: ${tokens.radii.inputBorderRadius}; 
`,
);
