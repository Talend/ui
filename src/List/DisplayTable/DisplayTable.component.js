import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import Actions from '../../Actions';

import theme from './DisplayTable.scss';

function RowRenderer(props) {
	const keys = props.columns.map(column => column.key); // {key, label}
	const row = [];
	keys.forEach(key => row.push(props.row[key]));
	return (
		<tr>
			{row.map((column, index) => {
				if (props.columns[index].key === props.titleKey) {
					const onClick = event => props.onTitleClick(props.row, event);
					return (
						<td key={index}>
							<Button
								bsStyle="link"
								onClick={onClick}
								role="link"
							>
								{column}
							</Button>
							<Actions
								actions={props.row.actions || []}
								hideLabel
								link
							/>
						</td>
					);
				}
				return (<td key={index}>{column}</td>);
			})}
		</tr>
	);
}
RowRenderer.propTypes = {
	row: PropTypes.object,
	columns: PropTypes.arrayOf(
		PropTypes.object
	),
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
};

function ListHeader(props) {
	return (
		<tr>
			{props.columns.map((column, index) => (<th key={index}>{column.label}</th>))}
		</tr>
	);
}
ListHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape(
			{ label: PropTypes.string },
		)
	),
};


/**
 * @param {object} props react props
 * @example
<DisplayTable name="Hello world"></DisplayTable>
 */
function DisplayTable({ items, columns, titleKey, onTitleClick }) {
	const className = classnames(
		'table',
		'tc-list-display-table',
		theme.table,
	);
	return (
		<table className={className}>
			<thead>
				<ListHeader columns={columns} />
			</thead>
			<tbody>
				{items.map(
					(item, index) => (
						<RowRenderer
							key={index}
							row={item}
							columns={columns}
							titleKey={titleKey || 'name'}
							onTitleClick={onTitleClick}
						/>
					)
				)}
			</tbody>
		</table>
	);
}

DisplayTable.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.object
	),
	columns: PropTypes.arrayOf(
		PropTypes.object
	),
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
};

export default DisplayTable;
