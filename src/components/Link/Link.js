import * as React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import { Button } from 'reakit';
import tokens from '../../tokens';
import Icon from '../Icon/Icon';

const ButtonAsAnchor = styled(Button)(
	({ theme }) => `
	display: inline-flex;
    align-items: center;
    justify-content: space-between;
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
		margin-right: ${tokens.space.smaller};
		width: ${tokens.sizes.smallerr};
		fill: ${theme.colors.activeColor};
  		
  		&--external {
			margin-right: 0;
			margin-left: ${tokens.space.smaller};
		}
	}
`,
);

function Link({ children, disabled, href = '#', target, icon, ...rest }) {
	const isExternal = target?.toLocaleLowerCase().includes('blank');
	return (
		<ButtonAsAnchor
			as="a"
			className={`link ${disabled ? 'link--disabled' : ''} ${isExternal ? 'link--external' : ''}`}
			href={!disabled ? href : null}
			rel={isExternal ? 'noopener noreferrer' : null}
			target={target}
			aria-disabled={disabled ? 'true' : null}
			{...rest}
		>
			{icon && <Icon className="link__icon" name={icon} />}
			<span className="link__text">{children}</span>
			{isExternal && <Icon className="link__icon link__icon--external" name="link" />}
		</ButtonAsAnchor>
	);
}

export default Link;
