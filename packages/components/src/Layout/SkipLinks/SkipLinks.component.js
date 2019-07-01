import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Icon from '../../Icon';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

import theme from './SkipLinks.scss';

function SkipTo({ href, label }) {
	return (
		<a href={href}>
			<span className={theme.icon}>
				<Icon transform="rotate-270" name="talend-arrow-left" />
			</span>
			<span className={theme.text}>{label}</span>
		</a>
	);
}
SkipTo.propTypes = {
	href: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

/**
 * Skip links are a technique to ease keyboard navigation.
 * It consists in giving some links as the firsts focusable elements of the page
 * to go directly to some meaningful content.
 */
function SkipLinks({ mainId, navigationId, t }) {
	return (
		<nav
			className={theme['tc-skip-links']}
			aria-label={t('SKIP_LINKS', { defaultValue: 'Skip links' })}
		>
			<ul>
				{navigationId && (
					<li key="navigation">
						<SkipTo
							href={navigationId}
							label={t('SKIP_TO_NAV', { defaultValue: 'Skip to navigation' })}
						/>
					</li>
				)}
				<li key="main">
					<SkipTo
						href={mainId}
						label={t('SKIP_TO_MAIN', { defaultValue: 'Skip to main content' })}
					/>
				</li>
			</ul>
		</nav>
	);
}

SkipLinks.defaultProps = {
	t: getDefaultT(),
};

SkipLinks.propTypes = {
	navigationId: PropTypes.string,
	mainId: PropTypes.string.isRequired,
	t: PropTypes.func,
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(SkipLinks);
