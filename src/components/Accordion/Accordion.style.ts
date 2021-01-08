import styled from 'styled-components';
import { Composite as ReakitComposite, DisclosureContent as ReakitDisclosureContent } from 'reakit';

import tokens from '../../tokens';

export const Accordion = styled(ReakitComposite)`
	display: flex;
	flex-direction: column;
`;

export const DisclosureWrapper = styled.div`
	margin: ${tokens.space.m} 0;
	min-width: 25rem;
	border: 1px solid ${tokens.colors.gray100};
	border-radius: ${tokens.radii.rectRadius};

	&:hover {
		border-color: ${tokens.colors.gray200};
	}

	&:active {
		border-color: ${tokens.colors.gray300};
	}
`;

export const DisclosureHeading = styled.div<{ visible: boolean }>`
	display: flex;
	align-items: center;
	padding: ${tokens.space.m};
	max-height: 5rem;
	flex: 1;
	cursor: pointer;
	border-radius: ${props =>
		props.visible
			? `${tokens.radii.rectRadius} ${tokens.radii.rectRadius} 0 0`
			: tokens.radii.rectRadius};
	background: ${tokens.colors.gray50};
`;

export const DisclosureArrow = styled.span`
	flex: 0;
	margin-left: auto;
`;

export const DisclosureContent = styled(ReakitDisclosureContent)`
	padding: ${tokens.space.m};
	border-radius: 0 0 ${tokens.radii.rectRadius} ${tokens.radii.rectRadius};

	@media (min-width: ${tokens.breakpoints.l}) {
		max-height: 37rem;
		overflow: auto;
	}
`;
