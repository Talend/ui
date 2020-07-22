import React from 'react';
import styled from 'styled-components';

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

function TableOfContents() {
	const [headings, setHeadings] = React.useState([]);

	React.useLayoutEffect(() => {
		// @ts-ignore
		setHeadings(() => [...document.getElementsByTagName('h2')]);

		// @ts-ignore
		tocbot.init({
			tocSelector: '.js-toc',
			contentSelector: '.sbdocs-content',
			headingSelector: 'h2, h3, h4, h5, h6',
			onClick: (event) => {
				event.preventDefault();
				document.getElementById(event.currentTarget.hash.substr(1)).focus();
			},
		});

		return () => {
			// @ts-ignore
			tocbot.destroy();
		};
	}, []);

	return (
		<Nav>
			{headings && <NavHeader>Table of contents</NavHeader>}
			<div className="js-toc"></div>
		</Nav>
	);
}

export default TableOfContents;
