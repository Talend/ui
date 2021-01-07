import styled from 'styled-components';
import { DisclosureContent as ReakitDisclosureContent } from 'reakit';

import tokens from '../../tokens';

export const DisclosureWrapper = styled.div`
	margin: ${tokens.space.m} 0;
	min-width: 25rem;
`;

export const DisclosureHeading = styled.div<{ visible: boolean }>`
	display: flex;
	padding: ${tokens.space.m};
	cursor: pointer;
	border-radius: ${props =>
		props.visible
			? `${tokens.radii.rectRadius} ${tokens.radii.rectRadius} 0 0`
			: tokens.radii.rectRadius};
	background: ${tokens.colors.gray50};
	border: 1px solid ${tokens.colors.gray100};

	&:hover {
		border-color: ${tokens.colors.gray200};
	}

	&:active {
		border-color: ${tokens.colors.gray300};
	}
`;

export const DisclosureArrow = styled.span`
	flex: 0;
	margin-left: auto;
`;

export const DisclosureContent = styled(ReakitDisclosureContent)`
	padding: ${tokens.space.m};
	max-height: 37rem;
	border: 1px solid ${tokens.colors.gray100};
	border-top: none;
	border-radius: 0 0 ${tokens.radii.rectRadius} ${tokens.radii.rectRadius};
`;
