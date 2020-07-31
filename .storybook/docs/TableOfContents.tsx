import React from 'react';
import styled from 'styled-components';
import tocbot from 'tocbot';

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

const configuration = {
	tocSelector: '.js-toc',
	contentSelector: '.sbdocs-content',
	headingSelector: 'h2, h3, h4, h5, h6',
};

function TableOfContents() {
	const [headings, setHeadings] = React.useState([]);

	React.useEffect(() => {
		// @ts-ignore
		setHeadings(() => [...document.getElementsByTagName('h2')]);

		tocbot.init({
			...configuration,
			onClick: event => {
				event.preventDefault();
				// @ts-ignore
				const hash = event?.currentTarget.hash;
				const id = hash?.substr(1);
				const element = document.getElementById(id);
				setTimeout(() => {
					element?.focus();
					element?.scrollIntoView();
				}, 500);
			},
		});

		return () => {
			tocbot.destroy();
		};
	}, []);

	return (
		<Nav>
			{headings.length > 0 && <NavHeader>Table of contents</NavHeader>}
			<div className="js-toc"></div>
		</Nav>
	);
}

export default TableOfContents;
