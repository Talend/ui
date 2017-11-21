import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-cmf';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FilterBar from '../FilterBar';
import List from '../List';
import TreeView from '../TreeView';
import theme from './SelectObject.scss';

function SelectObject(props) {
	return (
		<div className={`tc-select-object ${theme.wrapper}`}>
			<FilterBar
				className={theme.filter}
				id={props.id}
				dockable={false}
				navbar={false}
				{...props.filter}
			/>
			{!props.tree ? (
				<List
					{...props.list}
					id={`${props.id}-list`}
					data={props.filteredData}
					className={theme.list}
				/>
			) : (
				<TreeView {...props.tree} id={`${props.id}-tree`} noHeader data={props.filteredData} />
			)}
			{props.preview &&
				props.selected && <Inject component={props.preview} data={props.selected} />}
			{props.preview &&
				props.selected && <Inject component={props.preview} data={props.selected} />}
		</div>
	);
}

SelectObject.displayName = 'SelectObject';
SelectObject.propTypes = {
	id: PropTypes.string,
	tree: PropTypes.bool,
	preview: PropTypes.string,
	sourceData: ImmutablePropTypes.List,
	selected: PropTypes.object,
};

export default SelectObject;
