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
			<ul className="footer__links">
				{children.map((link, index) => (
					<li className="footer__links-item" key={index}>
						{link}
					</li>
				))}
			</ul>
			<span className="footer__copyright">© 2020 Talend. All rights reserved.</span>
		</SFooter>
	);
};

export default Header;
