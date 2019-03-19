import React from 'react';
import PropTypes from 'prop-types';

import { ListContext } from './context';
import useDisplayMode from './DisplayMode/useDisplayMode';

export default function Manager(props) {
	const { initialDisplayMode, onDisplayModeChange } = props;
	const [displayMode, setDisplayMode] = useDisplayMode(initialDisplayMode, onDisplayModeChange);
	const contextValues = {
		collection: props.collection,
		displayMode: props.displayMode || displayMode,
		onDisplayModeChange: setDisplayMode,
	};

	return <ListContext.Provider value={contextValues}>{props.children}</ListContext.Provider>;
}
Manager.displayName = 'List.Manager';
Manager.propTypes = {
	children: PropTypes.node,
	collection: PropTypes.array,

	initialDisplayMode: PropTypes.string,
	displayMode: PropTypes.string,
	onDisplayModeChange: PropTypes.func,
};
