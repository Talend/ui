import React from 'react';
import Toolbar from './Toolbar';
import DisplayLarge from './DisplayLarge';
import DisplayTable from './DisplayTable';
import DisplayTile from './DisplayTile';

/**
 * @param {object} props react props
 * @example
const props = {
	items: [{}, {}, ...],
	displayMode: 'table' / 'large' / 'tile' / component
	onChangeDisplay: function,
	filter: {
		placeholder: 'find xx',
		onChangeFilter: function,
	},
	sortBy: [
		{key, label},
	],
	sortDesc: true / false,
	onSelectSortBy: function,
	columns: [
		{key, label},
		{key, label},
	]
}
<List {...props}></List>
 */
function List(props) {
	const toolbar = {};
	const displayProps = {};
	Object.keys(Toolbar.propTypes).forEach((id) => {
		if (props[id] !== undefined) {
			toolbar[id] = props[id];
		}
	});
	let displayModePropTypes = DisplayTable.propTypes;
	let displayModeComponent = DisplayTable;
	if (props.displayMode === 'tile') {
		displayModePropTypes = DisplayTile.propTypes;
		displayModeComponent = DisplayTile;
	}
	if (props.displayMode === 'large') {
		displayModePropTypes = DisplayLarge.propTypes;
		displayModeComponent = DisplayLarge;
	}
	if (typeof props.displayMode === 'function') {
		displayModePropTypes = props.displayMode.propTypes;
		displayModeComponent = props.displayMode;
	}
	Object.keys(displayModePropTypes).forEach((id) => {
		if (props[id] !== undefined) {
			displayProps[id] = props[id];
		}
	});
	const content = React.createElement(
		displayModeComponent,
		displayProps
	);
	return (
		<div className="tc-list">
			<Toolbar {...toolbar} />
			{content}
		</div>
	);
}

List.propTypes = Object.assign(
	{},
	Toolbar.propTypes,
);

export default List;
