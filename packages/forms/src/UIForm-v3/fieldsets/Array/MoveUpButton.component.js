import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Action } from '@talend/react-components/lib/Actions';
import ArrayContext from './context';

import theme from './Array.scss';

export default function MoveUpButton({ index, ...rest }) {
	const { moveItemUp } = useContext(ArrayContext);
	return (
		<Action
			type="button"
			className={theme.moveUp}
			onClick={() => moveItemUp(index)}
			disabled={index === 0}
			icon="talend-arrow-left"
			iconTransform="rotate-90"
			hideLabel
			link
			{...rest}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	MoveUpButton.propTypes = {
		index: PropTypes.number.isRequired,
	};
}
