import styled from 'styled-components';

import tokens from '../../tokens';

export type InlineMessageProps = {
	small?: boolean;
	withBackground?: boolean;
};

export const InlineMessage = styled.div<InlineMessageProps>(
	({ small, withBackground, theme }) => `
	display: ${withBackground ? 'inline-flex' : 'inline'};
	margin-right: 0.5rem;
	${
		withBackground
			? `padding: ${tokens.space.xs} ${tokens.space.s} ${tokens.space.xs} ${tokens.space.xl};`
			: ''
	}
	font-family: ${tokens.fonts.sansSerif};
	${small ? `font-size: ${tokens.fontSizes.small};` : ''}

	p {
		margin: 0;
	}
	
	.inline-message__icon {
		padding-right: ${tokens.space.xs};
		${withBackground ? `margin-left: -${tokens.space.l}; ` : ''}
		    
		svg {
	  		margin-bottom: ${small ? '-0.1rem' : '-0.2rem'};
			height: ${small ? tokens.sizes.s : tokens.sizes.m};
			width: ${small ? tokens.sizes.s : tokens.sizes.m};
		}

		path {
			fill: currentColor;
		}
	}
	
	.inline-message__title,
	.inline-message__description {
		color: ${withBackground ? tokens.colors.gray[900] : theme.colors.textColor};
	}
`,
);
