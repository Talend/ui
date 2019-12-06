import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Action } from '@talend/react-components/lib/Actions';
import ArrayContext from '../context';

import theme from '../Array.scss';

export default function MoveDownButton({ index, ...rest }) {
	const { nbItems, moveItemDown } = useContext(ArrayContext);
	return (
		<Action
			type="button"
			className={theme.moveDown}
			onClick={() => moveItemDown(index)}
			disabled={index === nbItems - 1}
			icon="talend-arrow-left"
			iconTransform="rotate-270"
			hideLabel
			link
			{...rest}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	MoveDownButton.propTypes = {
		index: PropTypes.number.isRequired,
	};
}
