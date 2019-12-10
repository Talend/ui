import React from 'react';
import PropTypes from 'prop-types';
import DataListComponent from '@talend/react-components/lib/Datalist';
import FieldTemplate from '../../templates/FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../templates/utils';
import useControlledInput from '../useControlledInput';

function Datalist(props) {
	const { defaultValue, description, inProgress, label, registerOptions, rhf, ...rest } = props;
	const { id, name, required } = rest;
	const { errors, setValue } = rhf;

	const value = useControlledInput({ defaultValue, name, registerOptions, rhf });
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const error = errors[name];

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			error={error}
			errorId={errorId}
			id={id}
			label={label}
			inProgress={inProgress}
		>
			<DataListComponent
				{...rest}
				onChange={(_, payload) => {
					setValue(name, payload.value, true);
				}}
				value={value}
				inputProps={{
					'aria-invalid': !!error,
					'aria-required': required,
					'aria-describedby': `${descriptionId} ${errorId}`,
				}}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		id: PropTypes.string.isRequired,
		className: PropTypes.string,
		defaultValue: PropTypes.string,
		description: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.string.isRequired,
		registerOptions: PropTypes.object,
		rhf: PropTypes.object.isRequired,
	};
}

export default React.memo(Datalist);
