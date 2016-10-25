import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import Actions from '../../Actions';

import theme from './DisplayTable.scss';

function RowRenderer(props) {
	return (
		<tr>
			{props.columns.map((column, index) => {
				if (column.key === props.titleKey) {
					const onClick = event => props.onTitleClick(
						event,
						props.item,
					);
					return (
						<td key={index}>
							<Button
								bsStyle="link"
								onClick={onClick}
								role="link"
							>
								{props.item[column.key]}
							</Button>
							<Actions
								actions={props.item.actions || []}
								hideLabel
								link
							/>
						</td>
					);
				}
				return (<td key={index}>{props.item[column.key]}</td>);
			})}
		</tr>
	);
}
RowRenderer.propTypes = {
	item: PropTypes.object,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
		})
	).isRequired,
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
							item={item}
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
