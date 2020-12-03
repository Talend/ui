import styled from 'styled-components';
import { shade } from 'polished';

import tokens from '../../tokens';

export const Link = styled.a(
	({ theme }) => `
	font-family: ${tokens.fonts.sansSerif};
	color: ${theme.colors.activeColor};
	
	.link__text {
		border-bottom: .1rem solid transparent;
		transition: .3s ease; 
	}
	
	.link__text, 
	.link__icon {
	    vertical-align: middle;
	}

	.link__icon {
  		height: ${tokens.sizes.m};
  		width: ${tokens.sizes.m};
  		
  		&--external {
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
