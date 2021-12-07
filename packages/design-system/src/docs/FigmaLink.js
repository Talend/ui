import React from 'react';
import styled from 'styled-components';

import tokens from '../tokens';

const FigmaIcon = React.memo(() => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
		<g fill="none">
			<path
				fill="#333"
				d="M0,8 C0,3.58173333 3.58173333,0 8,0 C12.4182667,0 16,3.58173333 16,8 C16,12.4182667 12.4182667,16 8,16 C3.58173333,16 0,12.4182667 0,8 Z"
			/>
			<path
				fill="#0ACF83"
				d="M6.4,12.7999667 C7.28366667,12.7999667 8,12.0836333 8,11.1999667 L8,9.59996667 L6.4,9.59996667 C5.51633333,9.59996667 4.8,10.3163333 4.8,11.1999667 C4.8,12.0836333 5.51633333,12.7999667 6.4,12.7999667 Z"
			/>
			<path
				fill="#A259FF"
				d="M4.8,8 C4.8,7.11633333 5.51633333,6.4 6.4,6.4 L8,6.4 L8,9.6 L6.4,9.6 C5.51633333,9.6 4.8,8.88363333 4.8,8 Z"
			/>
			<path
				fill="#F24E1E"
				d="M4.8,4.8 C4.8,3.91633333 5.51633333,3.19999333 6.4,3.19999333 L8,3.19999333 L8,6.4 L6.4,6.4 C5.51633333,6.4 4.8,5.68363333 4.8,4.8 Z"
			/>
			<path
				fill="#FF7262"
				d="M8,3.19999333 L9.6,3.19999333 C10.4836667,3.19999333 11.2,3.91633333 11.2,4.8 C11.2,5.68363333 10.4836667,6.4 9.6,6.4 L8,6.4 L8,3.19999333 Z"
			/>
			<path
				fill="#1ABCFE"
				d="M11.2,8 C11.2,8.88363333 10.4836667,9.6 9.6,9.6 C8.71633333,9.6 8,8.88363333 8,8 C8,7.11633333 8.71633333,6.4 9.6,6.4 C10.4836667,6.4 11.2,7.11633333 11.2,8 Z"
			/>
		</g>
	</svg>
));

const Link = styled.a.attrs({
	target: '_blank',
	rel: 'noopener noreferrer',
})`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	float: right;
	cursor: pointer;
	padding: 0.8rem;
	color: ${tokens.colors.lochmara[500]};
	border: 1px solid ${tokens.colors.lochmara[500]};
	border-radius: ${tokens.radii.rectRadius} 0 0 ${tokens.radii.rectRadius};

	&:hover,
	&:focus,
	&:active {
		background: ${tokens.colors.paleCyan[100]};
	}

	&:active {
		color: ${tokens.colors.lochmara[600]};
		cursor: grabbing;
	}

	svg {
		margin-right: 0.5rem;
		height: 1.6rem;
		width: 1.6rem;
	}
`;

const FigmaLink = props => {
	return (
		<Link {...props}>
			<FigmaIcon aria-hidden />
			<span>Figma</span>
		</Link>
	);
};

export default React.memo(FigmaLink);
