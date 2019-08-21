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

function RelativeDateSimple({ fromNow, fullDate, t }) {
	return (
		<span title={fullDate}>
			{t('DATE_FNS_AGO', { defaultValue: '{{value}} ago', value: fromNow })}
		</span>
	);
}

function RelativeDateWithIcon({ fromNow, fullDate, tooltipPlacement, t }) {
	return (
		<TooltipTrigger label={fullDate} tooltipPlacement={tooltipPlacement}>
			<React.Fragment>
				<Icon name="talend-scheduler" /> {t('DATE_FNS_AGO', { defaultValue: '{{value}} ago', value: fromNow })}
			</React.Fragment>
		</TooltipTrigger>
	);
}

RelativeDateWithIcon.defaultProps = {
	tooltipPlacement: 'top',
};

function RelativeDate({ withIcon, date, fullDateFormat, options, t }) {
	const locale = getLocaleObject(t);

	const props = {
		fullDate: format(date, fullDateFormat),
		fromNow: distanceInWordsToNow(date, { locale, ...options }),
		t,
	};

	return withIcon
		? <RelativeDateWithIcon {...props} />
		: <RelativeDateSimple {...props} />;
}

if (process.env.NODE_ENV !== 'production') {
	RelativeDate.propTypes = {
		withIcon: PropTypes.bool,
		date: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		options: PropTypes.object,
		fullDateFormat: PropTypes.string,
		t: PropTypes.func,
	};

	RelativeDateSimple.propTypes = {
		fromNow: PropTypes.string,
		fullDate: PropTypes.string,
		t: PropTypes.func,
	};

	RelativeDateWithIcon.propTypes = {
		...RelativeDateSimple.propTypes,
		tooltipPlacement: TooltipTrigger.propTypes.tooltipPlacement,
	};
}

RelativeDate.defaultProps = {
	withIcon: false,
	options: {},
	t: getDefaultT(),
	fullDateFormat: 'YYYY-MM-DD HH:mm:ss',
};

export default RelativeDate;
