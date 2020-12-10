import styled from 'styled-components';
import { shade } from 'polished';

import tokens from '../../tokens';

export const Link = styled.a(
	({ theme }) => `
	font-family: ${tokens.fonts.sansSerif};
	color: ${theme.colors.activeColor};
	text-decoration: none;
	
	.link__text {
		border-bottom: .1rem solid transparent;
		transition: ${tokens.transitions.fast}; 
	}

	.link__icon {
  		margin-bottom: -0.2rem;
  		height: ${tokens.sizes.m};
  		width: ${tokens.sizes.m};
  		
  		&--external {
			margin-bottom: -0.1rem;
			height: ${tokens.sizes.s};
			width: ${tokens.sizes.s};
		}
  		
  		&--before {
  			margin-right: ${tokens.space.xs};
		}
  		
  		&--external,
	 	&--after {
			margin-left: ${tokens.space.xs};
		}
	}
	
	&:hover,
	&:active {
		.link__text {
			border-bottom-color: ${theme.colors.activeColor};
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
			border-bottom-color: transparent;
		}
	}
`,
);
