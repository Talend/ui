import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { JSONSchemaRenderer } from '@talend/react-components';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
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
			<FilterBar id={props.id} dockable={false} navbar={false} {...props.filter} />
			<div className={theme.container}>
				{!props.tree &&
					!props.filteredData && (
						<List
							{...props.list}
							id={`${props.id}-list`}
							data={props.sourceData}
							className={theme.list}
						/>
					)}
				{props.tree &&
					!props.filteredData && (
						<TreeView
							{...props.tree}
							componentId={props.id}
							noHeader
							data={props.sourceData}
							className={theme.tree}
						/>
					)}
				{props.filteredData && (
					<ListGroup className={theme.results}>
						{props.filteredData.map(data => (
							<ListGroupItem
								key={data.get(props.idAttr)}
								header={data.get(props.nameAttr)}
								onClick={event => props.results.onClick(event, data)}
								active={props.results.selectedId === data.get(props.idAttr)}
							>
								{data.get('currentPosition')}
							</ListGroupItem>
						))}
					</ListGroup>
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
