import React from 'react';
import PropTypes from 'prop-types';
import { format, distanceInWordsToNow } from 'date-fns';
import en from 'date-fns/locale/en';
import fr from 'date-fns/locale/fr';
import ja from 'date-fns/locale/ja';

import Icon from '../Icon';
import TooltipTrigger from '../TooltipTrigger';
import getLocale from '../DateFnsLocale/locale';
import getDefaultT from '../translate';

function getLocaleObject(t) {
	switch (getLocale(t)) {
		case 'fr':
			return fr;
		case 'ja':
			return ja;
		case 'en':
		default:
			return en;
	}
}

function RelativeDate({ withIcon, date, fullDateFormat, options, t }) {
	const locale = getLocaleObject(t);

	const fullDate = format(date, fullDateFormat);
	const fromNow = distanceInWordsToNow(date, { locale, ...options });
	const relativeDate = t('DATE_FNS_AGO', { defaultValue: '{{value}} ago', value: fromNow });

	return withIcon
		? (
			<TooltipTrigger label={fullDate} tooltipPlacement="top">
				<React.Fragment>
					<Icon name="talend-scheduler" /> {relativeDate}
				</React.Fragment>
			</TooltipTrigger>
		)
		: <span title={fullDate}>{relativeDate}</span>;
}

if (process.env.NODE_ENV !== 'production') {
	RelativeDate.propTypes = {
		withIcon: PropTypes.bool,
		date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number])
			.isRequired,
		options: PropTypes.object,
		fullDateFormat: PropTypes.string,
		t: PropTypes.func,
	};
}

RelativeDate.defaultProps = {
	withIcon: false,
	options: {},
	t: getDefaultT(),
	fullDateFormat: 'YYYY-MM-DD HH:mm:ss',
};

export default RelativeDate;
