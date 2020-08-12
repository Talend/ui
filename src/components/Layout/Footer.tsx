import React from 'react';
import styled from 'styled-components';

export type FooterProps = {
	children?: any;
};

const SFooter = styled.div`
	display: flex;
	margin: 0 auto;

	ul {
		display: inline-flex;
	}

	li {
		padding: 0 0.5rem;
	}
`;

const Header: React.FC<FooterProps> = ({ children }) => {
	return (
		<SFooter>
			<ul>
				<li>Link a</li>
				<li>Link b</li>
				<li>Link c</li>
			</ul>
			<span>© 2020 Cobalt</span>
		</SFooter>
	);
};

export default Header;
