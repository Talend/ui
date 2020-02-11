import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import get from 'lodash/get';

import Datalist from '../../../../widgets/fields/Datalist';

const onEventGetValue = ([, payload]) => payload.value;

function RHFDatalist(props) {
	const { defaultValue, onChange, rules, ...restProps } = props;
	const { name } = restProps;
	const { control, errors } = useFormContext();
	const error = get(errors, name)?.message;

	const onValueChange = useMemo(() => {
		if (onChange) {
			return (...args) => {
				const [event, payload] = args[0];
				onChange(event, payload);
				return onEventGetValue(...args);
			};
		}

		return onEventGetValue;
	}, [onChange]);

	return (
		<Controller
			as={Datalist}
			control={control}
			rules={rules}
			onChange={onValueChange}
			defaultValue={defaultValue}
			error={error}
			{...restProps}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	RHFDatalist.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string,
		defaultValue: PropTypes.string,
		description: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		resolveName: PropTypes.func,
		restricted: PropTypes.bool,
		rules: PropTypes.object,
		titleMap: PropTypes.array,
	};
}

export default React.memo(RHFDatalist);
