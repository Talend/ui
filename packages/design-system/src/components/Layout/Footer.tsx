import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export type FooterProps = React.PropsWithChildren<any>;

const SFooter = styled.div`
	display: flex;
	margin: 0 auto;
`;

const Footer = React.forwardRef(({ children, ...rest }: FooterProps, ref: React.Ref<any>) => {
	const { t } = useTranslation();
	return (
		<SFooter {...rest} ref={ref}>
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
					year: new Date().getFullYear(),
				})}
			</span>
		</SFooter>
	);
});

export default Footer;
