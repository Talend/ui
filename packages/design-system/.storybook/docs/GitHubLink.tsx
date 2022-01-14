import React from 'react';
import tokens from '@talend/design-tokens';
import styled from 'styled-components';

const GitHubIcon = React.memo(() => (
	<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 120 120">
		<defs />
		<path d="M45.2 3C34.3 5.9 26.5 10.4 18 19 9.3 27.6 4.9 35.3 2 46.6a60.07 60.07 0 005.2 42.7c4.8 9.2 16.4 20.5 25.9 25.1 10.3 5.1 11.3 4.8 11.7-3.5l.3-6.6h-5.9c-7.5 0-11.6-2.3-14.7-8.4-1.3-2.6-3.8-5.8-5.5-7.3-3.6-2.9-3.1-5.1.9-4.1 3.2.8 5.1 2.3 4.7 3.8-.1.7-.1.8.2.4.5-.9 3.2 1.1 3.2 2.5 0 .5-.4.6-1 .3-.5-.3-1-.1-1 .5 0 .7.6 1 1.4.7.8-.3 2.2.3 3.1 1.3 3.9 4.3 13.7 3.7 15.3-.8.6-1.5 1.3-3.4 1.7-4.3.5-1.3-.2-1.8-3.5-2.3-6-.9-13.5-5-16.5-9-6-7.9-7.3-21.3-2.9-30.6 1.9-3.9 2.6-6.9 2.5-10.3-.2-2.6 0-6.1.4-7.7.9-4 4.3-4 11.9-.1 5.5 2.8 5.9 2.8 13.2 1.8 5.3-.8 9.5-.8 14.8 0 7.3 1 7.7 1 13.2-1.8 7.6-3.9 11-3.9 11.9.1.4 1.6.6 5.1.4 7.7-.1 3.4.6 6.4 2.5 10.3 4.4 9.3 3.1 22.7-2.9 30.6-3.1 4.1-10.8 8.2-16.9 9l-4.5.7 1.7 2.5c1.3 2 1.8 5.7 2.2 15.1.6 15.1.6 15.1 11.9 9.5 9.5-4.6 21.1-15.9 25.9-25.1 4.2-8 7.2-19.8 7.2-28.3s-3-20.3-7.2-28.3c-4.2-8.1-16.4-20.3-24.5-24.5C75.1 1.3 59.2-.6 45.2 3z" />
		<path d="M29 96c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1a1 1 0 00-1 1zM33 98c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1a1 1 0 00-1 1zM42.5 98c-.3.5.1 1 1 1s1.3-.5 1-1c-.3-.6-.8-1-1-1-.2 0-.7.4-1 1zM38 99c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1a1 1 0 00-1 1z" />
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
	color: ${tokens.coralColorAccentText};
	border: 1px solid ${tokens.coralColorAccentBorder};
	border-radius: ${tokens.coralRadiusS} 0 0 ${tokens.coralRadiusS};

	&:hover,
	&:focus {
		color: ${tokens.coralColorAccentTextHover};
		background: ${tokens.coralColorAccentBackgroundHover};
	}

	&:active {
		color: ${tokens.coralColorAccentTextActive};
		background: ${tokens.coralColorAccentBackgroundActive};
	}

	svg {
		margin-right: 0.5rem;
		height: 1.6rem;
		width: 1.6rem;
	}
`;

const GitHubLink = (props: React.FunctionComponent) => {
	return (
		<Link {...props}>
			<GitHubIcon aria-hidden />
			<span>GitHub</span>
		</Link>
	);
};

export default React.memo(GitHubLink);
