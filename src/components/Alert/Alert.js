import React from 'react';
import styled from 'styled-components';
import tokens from '../../tokens';

export const StyledComponent = styled.div`
	display: inline-flex;
	align-items: baseline;

	> * {
		padding-left: ${tokens.spacings.smaller};
	}

	svg {
		margin-left: 1rem;
		height: 1rem;
		max-width: 100%;
		fill: currentColor;
	}
`;

function Alert({ icon, title, description, link, ...rest }) {
	return (
		<StyledComponent {...rest}>
			{icon}
			{title && <header>{title}</header>}
			{description && <p>{description}</p>}
			{link}
		</StyledComponent>
	);
}

export default Alert;
