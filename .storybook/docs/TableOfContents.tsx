import * as React from 'react';
import styled from 'styled-components';
import { Button, VisuallyHidden } from 'reakit';

const Nav = styled.nav`
	position: fixed;
	top: 5rem;
	right: 5rem;
	padding: 1rem 0rem;
	background: white;
	border-radius: 0.2rem;
	z-index: 9999;

	.toc-list-item {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 0 1rem;
		cursor: pointer;

		&:before {
			position: absolute;
			content: ' ';
			display: inline-block;
			top: 0;
			left: 0;
			bottom: 0;
			width: 3px;
			background: #f5f5f5;
		}

		&.is-active-li {
			color: #0675c1;

			&:before {
				background: #0675c1;
			}
		}

		.toc-list-item {
			opacity: 0.6;

			&:before {
				content: none;
			}
		}
	}
`;

const NavHeader = styled.header`
	font-weight: bold;
`;

const ScrollToTopButton = styled(Button)`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2rem;
	width: 2rem;
	position: fixed;
	right: 5rem;
	bottom: 2rem;
	color: white;
	background: rgba(0, 0, 0, 0.65);
	border-radius: 50%;

	&:hover {
		background: rgba(0, 0, 0, 1);
	}
`;

function BackToTop() {
	return (
		<ScrollToTopButton onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}>
			<span aria-hidden={true}>↑</span>
			<VisuallyHidden>Back to top</VisuallyHidden>
		</ScrollToTopButton>
	);
}

function TableOfContents() {
	React.useLayoutEffect(() => {
		// @ts-ignore
		tocbot.init({
			tocSelector: '.js-toc',
			contentSelector: '.sbdocs-content',
			headingSelector: 'h2, h3, h4, h5',
			onClick: (event) => {
				event.preventDefault();
				document.getElementById(event.currentTarget.hash.substr(1)).focus();
			},
		});
		// @ts-ignore
		return () => tocbot.destroy();
	}, []);

	return (
		<Nav>
			<NavHeader>Table of contents</NavHeader>
			<div className="js-toc"></div>
			<BackToTop />
		</Nav>
	);
}

export default TableOfContents;
