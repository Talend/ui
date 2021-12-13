import { DialogDisclosure as ReakitDialogDisclosure } from 'reakit';
import styled from 'styled-components';

import tokens from '../../tokens';

export const DrawerDisclosure = ReakitDialogDisclosure;

export const Drawer = styled.div.attrs({
	className: 'c-drawer',
})`
	--c-drawer--color: var(--drawer--color, ${({ theme }) => theme.colors.textColor});
	--c-drawer--background: var(--drawer--background, ${({ theme }) => theme.colors.modalBackground});
	--c-drawer--heading--background: var(
		--drawer--heading--background,
		${({ theme }) => theme.colors.modalHeadingBackground}
	);
	--c-drawer--heading--border-color: var(
		--drawer-heading--border-color,
		${({ theme }) => theme.colors.modalHeadingBorderColor}
	);

	position: absolute;
	flex-shrink: 0;
	width: 30vw;
	display: flex;
	flex-direction: column;
	top: 0;
	right: 0;
	bottom: 0;
	color: var(--c-drawer--color);
	background: var(--c-drawer--background);
	box-shadow: ${tokens.shadows.above};
	z-index: ${tokens.zIndices.above};
	transition: ${tokens.transitions.normal};
	transform: translateX(100%);

	&[data-enter] {
		transform: translateX(0);
	}
`;
export const DrawerArea = styled.div`
	flex-grow: 0;
	flex-basis: 5.5rem;
	padding: ${tokens.space.xl};
`;
export const DrawerHeading = styled(DrawerArea).attrs({
	className: 'c-drawer__heading',
})`
	padding: ${tokens.space.m} ${tokens.space.xl};
	background: var(--c-drawer--heading--background);
	border-bottom: 1px solid var(--c-drawer--heading--border-color);
`;
export const DrawerBody = styled(DrawerArea).attrs({
	className: 'c-drawer__body',
})`
	flex-grow: 1;
	overflow: auto;
`;
export const DrawerFooter = styled(DrawerArea).attrs({
	className: 'c-drawer__footer',
})``;
