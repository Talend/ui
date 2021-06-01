import React from 'react';
import PropTypes from 'prop-types';

import Datalist from '../Datalist';

import { getTimezones } from './TimezoneList.utils';

function TimezoneList(props) {
	const { schema } = props;
	const { lang, schema: { type } } = schema;
	const [timezones, setZones] = React.useState([]);
	React.useEffect(() => {
		getTimezones(lang, type).then(zones => {
			setZones(zones);
		});
	}, [lang, type]);

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
