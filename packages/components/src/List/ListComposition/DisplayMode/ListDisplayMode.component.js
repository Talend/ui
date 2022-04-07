import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import DisplayModeToggle from '../../Toolbar/DisplayModeToggle/DisplayModeToggle.component';
import { useListContext } from '../context';
import { DISPLAY_MODE } from '../constants';

function ListDisplayMode({ children, displayModesOptions, id, onChange, selectedDisplayMode }) {
	const { displayMode, setDisplayMode, t } = useListContext();
	const onSelect = (event, value) => {
		if (onChange) {
			onChange(event, value);
		} else {
			setDisplayMode(value);
		}
	};

	if (children) {
		return children;
	}
	return (
		<DisplayModeToggle
			id={id}
			mode={selectedDisplayMode || displayMode}
			displayModes={displayModesOptions}
			onChange={onSelect}
			t={t}
		/>
	);
}

export const displayModesOptions = [DISPLAY_MODE.TABLE, DISPLAY_MODE.LARGE];

ListDisplayMode.defaultProps = {
	id: uuid.v4(),
	displayModesOptions,
};
ListDisplayMode.propTypes = {
	children: PropTypes.node,
	displayModesOptions: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string,
	onChange: PropTypes.func,
	selectedDisplayMode: PropTypes.string,
};

export default ListDisplayMode;
