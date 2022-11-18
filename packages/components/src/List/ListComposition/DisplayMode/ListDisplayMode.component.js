import React from 'react';
import PropTypes from 'prop-types';
import DisplayModeToggle, {
	displayModesOptions as options,
} from '../../Toolbar/DisplayModeToggle/DisplayModeToggle.component';
import { useListContext } from '../context';

export {
	DisplayModeActionIcon as DisplayModeIcon,
	displayModesOptions,
} from '../../Toolbar/DisplayModeToggle/DisplayModeToggle.component';

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

ListDisplayMode.defaultProps = {
	id: crypto.randomUUID(),
	displayModesOptions: options,
};
ListDisplayMode.propTypes = {
	children: PropTypes.node,
	displayModesOptions: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string,
	onChange: PropTypes.func,
	selectedDisplayMode: PropTypes.string,
};

export default ListDisplayMode;
