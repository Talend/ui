import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import tokens from '../tokens';

const Nav = styled.nav`
	position: fixed;
	top: 5rem;
	right: 5rem;
	padding: 1rem 0rem;
	background: white;
	border-radius: 0.2rem;
	z-index: 9999;

	li {
		display: flex;
	}

	a {
		position: relative;
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

		&.active {
			color: ${tokens.colors.lochmara};

			&:before {
				background: ${tokens.colors.lochmara};
			}
		}
	}
`;

function TOC() {
	const [headings, setHeadings] = React.useState([]);

	React.useEffect(() => {
		setHeadings(() => [...document.getElementsByTagName('h2')]);
	}, []);

	if (!headings.length) {
		return null;
	}

	return (
		<Nav>
			<span>Table of content</span>
			<ul>
				{(headings || []).map((heading, index) => {
					return (
						<li key={index}>
							<Link activeClass="active" to={heading.id} spy={true} smooth={true} duration={500}>
								{heading.innerText}
							</Link>
						</li>
					);
				})}
			</ul>
		</Nav>
	);
}

export default TOC;
