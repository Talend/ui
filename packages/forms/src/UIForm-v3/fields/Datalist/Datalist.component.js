import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DataListComponent from '@talend/react-components/lib/Datalist';
import FieldTemplate from '../../templates/FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../templates/Message/generateId';
import { getError } from '../../utils';

function Datalist(props) {
	const { description, inProgress, label, useForm, ...rest } = props;
	const { id, name, required } = rest;
	const { errors, messages, register, unregister, setValue, watch } = useForm;

	useEffect(() => {
		register({ name });
		return () => unregister(name);
	}, [name, register, unregister]);

	const value = watch(name);
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const error = getError(errors, name, messages);

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
				onChange={(_, payload) => setValue(name, payload.value)}
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
		description: PropTypes.string,
		inProgress: PropTypes.bool,
		label: PropTypes.string.isRequired,
		useForm: PropTypes.object.isRequired,
	};
}

export default React.memo(Datalist);
