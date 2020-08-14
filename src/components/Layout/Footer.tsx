import React from 'react';
import styled from 'styled-components';

export type FooterProps = {
	children?: any;
};

const SFooter = styled.div`
	display: flex;
	margin: 0 auto;
`;

const Header: React.FC<FooterProps> = ({ children, ...rest }) => {
	return (
		<SFooter {...rest}>
			<ul className="footer__links">
				{children.map((link, index) => (
					<li className="footer__links-item" key={index}>
						{React.cloneElement(link, { className: 'footer__link' })}
					</li>
				))}
			</ul>
			<span className="footer__copyright">
				© {new Date().getFullYear()} Talend. All rights reserved.
			</span>
		</SFooter>
	);
};

export default Header;
