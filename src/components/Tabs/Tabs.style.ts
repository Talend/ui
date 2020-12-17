import styled from 'styled-components';
import { Tab as ReakitTab, TabList as ReakitTabList, TabPanel as ReakitTabPanel } from 'reakit';
import tokens from '../../tokens';

export const TabList = styled(ReakitTabList)`
	> * {
		margin: ${tokens.space.none} ${tokens.space.s};

		&:first-child {
			margin-left: ${tokens.space.none};
		}

		&:last-child {
			margin-right: ${tokens.space.none};
		}
	}
`;

export const Tab = styled(ReakitTab)(
	({ theme }) => `
	display: inline-flex;
	padding: ${tokens.space.none};
	padding-bottom: ${tokens.space.xs}; 
	border: none;
	color: ${theme.colors.textColor};
	background: none;
	appearance: none;
	transition: ${tokens.transitions.fast};
	cursor: pointer;
	
	.ellipsis {
		max-width: 20rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
		
	&:hover,
	&[aria-selected='true'] {
		color:  ${theme.colors.activeColor};	
	}

	&[aria-selected='true'] {
		font-weight: ${tokens.fontWeights.semiBold};
		box-shadow: ${tokens.shadows.underline} ${theme.colors.activeColor};
	}
	
	.icon {
		margin-left: ${tokens.space.none};
		margin-right: ${tokens.space.xs};
		width: ${tokens.sizes.s};
		height: ${tokens.sizes.s};
		color: ${theme.colors.textColor};
	}
	
	.tag {
		vertical-align: middle;
		margin-left: ${tokens.space.xs};
		margin-right: ${tokens.space.none};
	}
`,
);

export const TabPanel = styled(ReakitTabPanel)``;
