import React from 'react';
import PropTypes from 'prop-types';
import { Inject } from '@talend/react-cmf';
import ImmutablePropTypes from 'react-immutable-proptypes';
import List from '../List';
import TreeView from '../TreeView';
import theme from './SelectObject.scss';

function SelectObject(props) {
	return (
		<div className={`tc-select-object ${theme.wrapper}`}>
			<div>
				FilterBar
				<input type="text" onChange={props.onFilter} />
			</div>
			{!props.tree ? (
				<List
					data={props.filteredData}
					className={theme.list}
					{...props.list}
				/>
			) : (
				<TreeView
					{...props.tree}
					noHeader
					data={props.filteredData}
				/>
			)}
			{props.preview === 'string' && props.selected && (
				<Inject component={props.preview} data={props.selected} />
			)}
		</div>
	);
}

SelectObject.displayName = 'SelectObject';
SelectObject.propTypes = {
	tree: PropTypes.bool,
	preview: PropTypes.string,
	sourceData: ImmutablePropTypes.List,
	selected: PropTypes.object,
};

export default SelectObject;
