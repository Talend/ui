import React from 'react';
import styled from 'styled-components';
import tokens from '@talend/design-tokens';

const Link = styled.a.attrs(({ href }) => ({
	target: href ? '_blank' : undefined,
	rel: href ? 'noopener noreferrer' : undefined,
}))`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 1ch;
	text-decoration: none;

	&[href] {
		cursor: pointer;
	}

	svg {
		height: ${tokens.coralSizeM};
		width: ${tokens.coralSizeM};
	}
`;

export default React.memo(Link);
