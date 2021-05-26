import styled from 'styled-components';

import {
	Dialog as ReakitDialog,
	DialogDisclosure as ReakitDialogDisclosure,
	DialogBackdrop as ReakitDialogBackdrop,
} from 'reakit';

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
	z-index: ${tokens.zIndices.backdrop};
	transition: opacity ${tokens.transitions.slow};
	opacity: ${tokens.opacity.transparent};

	&[data-enter] {
		opacity: ${tokens.opacity.opaque};
	}
`;

export const Dialog = styled.div`
	max-height: 80vh;
	border-radius: ${tokens.radii.rectRadius};
	padding: 3rem;
	color: ${({ theme }) => theme.colors.textColor};
	background-color: ${({ theme }) => theme.colors.modalBackground};
	box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.25);
	z-index: ${tokens.zIndices.modal};
	transition: ${tokens.transitions.normal};
	opacity: ${tokens.opacity.transparent};
	transform-origin: top center;
	transform: translate3d(0, -10%, 0);

	&[data-enter] {
		opacity: ${tokens.opacity.opaque};
		transform: translate3d(0, 0, 0);
	}
`;

export const DialogHeading = styled.header`
	display: flex;
	align-items: center;
	margin: -3rem -3rem 3rem;
	padding: 1.5rem 3rem;
	background: ${({ theme }) => theme.colors.modalHeadingBackground};
	border-bottom: 1px solid ${({ theme }) => theme.colors.modalHeadingBorderColor};

	h1 {
		font-size: ${tokens.fontSizes.large};
		color: ${({ theme }) => theme.colors.textColor};
	}
`;

export const DialogButtons = styled.footer`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 3rem;
`;
