import styled from 'styled-components';

import {
	Dialog as ReakitDialog,
	DialogDisclosure as ReakitDialogDisclosure,
	DialogBackdrop as ReakitDialogBackdrop,
} from 'reakit/Dialog';

import tokens from '../../tokens';

export const DialogDisclosure = ReakitDialogDisclosure;

export const DialogBackdrop = styled(ReakitDialogBackdrop)`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;

export const Dialog = styled(ReakitDialog)(
	({ theme }) => `
		max-height: 80vh;
		border-radius: ${tokens.radii.rectRadius};
		padding: 3rem;
		border: 1px solid rgba(33, 33, 33, 0.25);
		color: ${theme.colors.textColor};
		background-color: ${theme.colors.modalBackground};
		box-shadow: 0 2px 7px 0px rgba(0,0,0,0.2);
		z-index: 999;
`,
);

export const DialogHeading = styled.header(
	({ theme }) => `
		display: flex;
		align-items: center;
		margin: -3rem -3rem 3rem;
		padding: 1.5rem 3rem;
		width: calc(100% + 2 * 3rem);
		background: ${theme.colors.modalHeadingBackground};
		border-bottom: 1px solid ${theme.colors.modalHeadingBorderColor};
`,
);

export const DialogButtons = styled.footer(
	({ theme }) => `
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-top: 3rem;
`,
);
