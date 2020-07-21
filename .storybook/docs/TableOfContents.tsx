import * as React from 'react';
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
			opacity: 0.5;

			&:before {
				content: none;
			}
		}
	}
`;

function TableOfContents() {
	React.useLayoutEffect(() => {
		// @ts-ignore
		tocbot.init({
			tocSelector: '.js-toc',
			contentSelector: '.sbdocs-content',
			headingSelector: 'h2, h3, h4, h5',
			onClick: (event) => {
				event.preventDefault();
				const element = document.getElementById(event.currentTarget.hash.substr(1));
				element.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
				element.focus();
			},
		});
		// @ts-ignore
		return () => tocbot.destroy();
	}, []);

	return (
		<>
			<Nav>
				<strong>Table of content</strong>
				<div className="js-toc"></div>
			</Nav>
		</>
	);
}

export default TableOfContents;
