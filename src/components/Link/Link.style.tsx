import styled from 'styled-components';
import { shade } from 'polished';

import { Button } from 'reakit';

import tokens from '../../tokens';

export const Link = styled(Button)(
	({ theme }) => `
	color: ${theme.colors.activeColor};
	
	&:hover,
	&:active {
		.link__text {
			text-decoration: underline;
		}
	}
	
	&:hover {
		color: ${shade(0.2, theme.colors.activeColor)};

		.link__icon {
			fill: ${shade(0.2, theme.colors.activeColor)};
		}
	}
	
	&:active {
		color: ${shade(0.4, theme.colors.activeColor)};

		.link__icon {
			fill: ${shade(0.4, theme.colors.activeColor)};
		}
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
		width: ${tokens.sizes.smallerr};
		fill: currentColor;
  		
  		&--before {
  			margin-right: ${tokens.space.smaller};
		}
  		
  		&--external,
	 	&--after {
			margin-left: ${tokens.space.smaller};
		}
	}
`,
);
