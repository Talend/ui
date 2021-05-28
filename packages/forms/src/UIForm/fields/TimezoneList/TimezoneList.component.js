import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Datalist from '../Datalist';

import { getTimezones } from './TimezoneList.utils';

function TimezoneList(props) {
	const { schema } = props;
	const { lang, schema: { type } } = schema;

	// Compute timezones list options
	const timezones = useMemo(() => getTimezones(lang, type), [lang, type]);

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
