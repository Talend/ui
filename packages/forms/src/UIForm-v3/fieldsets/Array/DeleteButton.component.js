import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Action } from '@talend/react-components/lib/Actions';
import ArrayContext from './context';

import theme from './Array.scss';

export default function DeleteButton({ index, ...rest }) {
	const { deleteItem } = useContext(ArrayContext);
	return (
		<Action
			type="button"
			className={theme.delete}
			onClick={() => deleteItem(index)}
			icon="talend-trash"
			hideLabel
			link
			{...rest}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	DeleteButton.propTypes = {
		index: PropTypes.number.isRequired,
	};
}
