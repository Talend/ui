import styled from 'styled-components';
import { shade } from 'polished';

import tokens from '../../tokens';

export const Link = styled.a(
	({ theme }) => `
	color: ${theme.colors.activeColor};
	font-family: ${tokens.fonts.sansSerif};
	
	&:hover,
	&:active {
		.link__text {
			text-decoration: underline;
		}
	}
	
	&:hover {
		color: ${shade(0.2, theme.colors.activeColor)};
	}
	
	&:active {
		color: ${shade(0.4, theme.colors.activeColor)};
	}
	
	&.link--disabled {
		cursor: not-allowed;
		opacity: ${tokens.opacity.disabled};
		
		.link__text {
			text-decoration: none;
		}
	}

	.link__icon {
		display: inline-block;
		vertical-align: baseline;
  		
  		&--before {
  			margin-right: ${tokens.space.s};
		}
  		
  		&--external,
	 	&--after {
			margin-left: ${tokens.space.xs};
		}
	}
`,
);
