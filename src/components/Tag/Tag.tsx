import React from 'react';
import styled from 'styled-components';

import tokens from '../../tokens';

export type TagProps = {
	/** Tag content */
	children: any;
};

const Span = styled.span(
	({ theme }) => `
	display: inline-block;
	padding: 0 0.5rem;	
	max-width: 15rem;
	font-family: ${tokens.fonts.sansSerif};
	font-size: ${tokens.fontSizes.small};
	font-weight: ${tokens.fontWeights.semiBold};
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	color: ${theme.colors.tagDefaultColor};
	background-color: ${theme.colors.tagDefaultBackgroundColor};
	border-radius: ${tokens.radii.inputBorderRadius};
`,
);

const Tag: React.FC<TagProps> = props => {
	return <Span {...props} />;
};

export default React.memo(Tag);
