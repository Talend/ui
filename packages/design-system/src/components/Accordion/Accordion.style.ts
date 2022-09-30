import styled from 'styled-components';
import { Composite as ReakitComposite, DisclosureContent as ReakitDisclosureContent } from 'reakit';
import tokens from '@talend/design-tokens';

export const Accordion = styled(ReakitComposite)`
	display: flex;
	flex-direction: column;
`;

export const AccordionItem = styled.div`
	margin: ${tokens.coralSpacingM} 0;
	min-width: 25rem;
	border: 1px solid ${({ theme }) => theme.colors.accordionBorderColor};
	border-radius: ${tokens.coralRadiusS};

	&:hover {
		border-color: ${tokens.coralColorNeutralBorderWeak};
	}

	&:active {
		border-color: ${tokens.coralColorNeutralBorderWeakHover};
	}
`;

export const DisclosureHeading = styled.div<{ visible: boolean }>`
	display: flex;
	align-items: center;
	padding: ${tokens.coralSpacingM};
	max-height: 5rem;
	flex: 1;
	cursor: pointer;
	border-radius: ${props =>
		props.visible ? `${tokens.coralRadiusS} ${tokens.coralRadiusS} 0 0` : tokens.coralRadiusS};
	background: ${({ theme }) => theme.colors.accordionBackgroundColor};
`;

export const DisclosureArrow = styled.span`
	flex: 0;
	margin-left: auto;
`;

export const DisclosureContent = styled(ReakitDisclosureContent)`
	padding: 0;
	height: 0;
	border-radius: 0 0 ${tokens.coralRadiusS} ${tokens.coralRadiusS};
	transition: opacity ${tokens.coralTransitionSlow};
	opacity: 0;
	max-height: 37rem;
	overflow: auto;

	&[data-enter] {
		padding: ${tokens.coralSpacingM};
		height: auto;
		opacity: 1;
	}

	@media (min-width: ${tokens.coralBreakpointL}) {
		max-height: 37rem;
		overflow: auto;
	}
`;
