import styled from 'styled-components';
import { Popover as ReakitPopover, PopoverDisclosure as ReakitPopoverDisclosure } from 'reakit';

import tokens from '../../tokens';

export const PopoverDisclosure = styled(ReakitPopoverDisclosure)``;
export const Popover = styled(ReakitPopover)``;
export const AnimatedPopover = styled.div`
	opacity: 0;
	transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
	transform-origin: top left;
	transform: translate3d(0, -20px, 0);

	[data-enter] & {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	padding: ${tokens.space.m};
	box-shadow: ${tokens.shadows.onTop};
	border-radius: ${tokens.radii.rectRadius};
`;
