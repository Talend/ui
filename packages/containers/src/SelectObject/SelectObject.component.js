import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { JSONSchemaRenderer } from '@talend/react-components';

import FilterBar from '../FilterBar';
import List from '../List';
import TreeView from '../TreeView';
import theme from './SelectObject.scss';

function SelectObject(props) {
	let schema;
	if (props.schema && props.selected) {
		schema = {
			properties: props.selected,
			...props.schema,
		};
	}
	return (
		<div className={`tc-select-object ${theme.wrapper}`}>
			<FilterBar
				id={props.id}
				dockable={false}
				navbar={false}
				{...props.filter}
			/>
			<div className={theme.container}>
				{!props.tree ? (
					<List
						{...props.list}
						id={`${props.id}-list`}
						data={props.filteredData}
						className={theme.list}
					/>
				) : (
					<TreeView
						{...props.tree}
						componentId={props.id}
						noHeader
						data={props.filteredData}
						className={theme.tree}
					/>
				)}
				{schema && <JSONSchemaRenderer schema={schema} className={theme.preview} />}
			</div>
		</div>
	);
}

SelectObject.displayName = 'SelectObject';
SelectObject.propTypes = {
	id: PropTypes.string,
	tree: PropTypes.object,
	list: PropTypes.object,
	filter: PropTypes.object,
	schema: PropTypes.object,
	filteredData: ImmutablePropTypes.List,
	selected: PropTypes.object,
};

export default SelectObject;
