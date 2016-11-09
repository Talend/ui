import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import { Actions } from '../../Actions';
import Icon from '../../Icon';

import theme from './DisplayTable.scss';

function RowRenderer(props) {
	const { titleKey, onTitleClick, item } = props;
	return (
		<tr>
			{props.columns.map((column, index) => {
				if (column.key === titleKey) {
					const onClick = event => onTitleClick(
						event,
						item,
					);
					const iconName = props.iconKey && props.item[props.iconKey];
					return (
						<td key={index}>
							{iconName && <Icon name={iconName} />}
							<Button
								bsStyle="link"
								onClick={onClick}
								role="link"
							>
								{item[column.key]}
							</Button>
							<Actions
								actions={item.actions || []}
								hideLabel
								link
							/>
						</td>
					);
				}
				return (<td key={index}>{item[column.key]}</td>);
			})}
		</tr>
	);
}
RowRenderer.propTypes = {
	item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
		})
	).isRequired,
	iconKey: PropTypes.string,
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
function DisplayTable({ items, columns, iconKey, titleKey, onTitleClick }) {
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
							iconKey={iconKey}
							titleKey={titleKey}
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
	iconKey: PropTypes.string,
	titleKey: PropTypes.string,
	onTitleClick: PropTypes.func,
};

DisplayTable.defaultProps = {
	items: [],
	titleKey: 'name',
};

export default DisplayTable;
