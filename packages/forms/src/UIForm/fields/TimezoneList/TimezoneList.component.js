import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Datalist from '../Datalist';

import { getTimezones } from './TimezoneList.utils';

function TimezoneList(props) {
	const { schema } = props;
	const { lang, cldrTimezones } = schema;

	if (!cldrTimezones) {
		throw new Error('cldr timezones (from "cldr-dates-full") must be provided in TimezoneList widget UI schema.');
	}

	// Compute timezones list options
	const timezones = useMemo(() => getTimezones(lang, cldrTimezones), [lang, cldrTimezones]);

	return <Datalist
		{...props}
		schema={{
			...schema,
			restricted: true,
			titleMap: timezones,
			options: { ...schema.options, titleMap: timezones },
		}}
	/>;
}

TimezoneList.propTypes = {
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	schema: PropTypes.object,
	lang: PropTypes.string,
};

export default TimezoneList;
