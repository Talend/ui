import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export type FooterProps = {
	children?: ReactElement[];
};

const SFooter = styled.div`
	display: flex;
	margin: 0 auto;
`;

const Header: React.FC<FooterProps> = ({ children, ...rest }) => {
	const { t } = useTranslation();
	return (
		<SFooter {...rest}>
			<ul className="footer__links">
				{children?.map((link: ReactElement, index: number) => (
					<li className="footer__links-item" key={index}>
						{React.cloneElement(link, { className: 'footer__link' })}
					</li>
				))}
			</ul>
			<span className="footer__copyright">
				{t('FOOTER_COPYRIGHT', {
					defaultValue: '© {{year}} Talend. All rights reserved.',
					year: new Date().getFullYear()
				})}
			</span>
		</SFooter>
	);
};

export default Header;
