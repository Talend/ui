import React from 'react';
import classnames from 'classnames';
import theme from './DisplayTable.scss';

function RowRenderer(props) {
	const keys = props.columns.map(column => column.key); // {key, label}
	const row = [];
	keys.forEach(key => row.push(props.row[key]));
	return (
		<tr>
			{row.map((column, index) => {
				const onClickView = props.columns[index].onClickView;
				if (onClickView) {
					const onClick = event => onClickView(props.row, event);
					return (
						<td key={index}>
							<button className="btn btn-link" onClick={onClick} role="link">{column}</button>
							{props.row.actions ? props.row.actions.map(renderAction) : null}
						</td>
					);
				}
				return (<td key={index}>{column}</td>);
			})}
		</tr>
	);
	function renderAction(aprops, index) {
		const onClick = (event) => {
			aprops.onClick(props.row, event);
		};
		const btnClass = classnames(
			'btn',
			'btn-link',
			theme.btn
		);
		return (
			<div className="btn-group" key={index}>
				<button className={btnClass} onClick={onClick}>
					<i className={aprops.icon}></i>
				</button>
			</div>
		);
	}
	renderAction.propTypes = {
		onClick: React.PropTypes.func,
		icon: React.PropTypes.string,
		name: React.PropTypes.string,
	};
}
RowRenderer.propTypes = {
	row: React.PropTypes.object,
	columns: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
};

function ListHeader(props) {
	return (
		<tr>
			{props.columns.map((column, index) => (<th key={index}>{column.label}</th>))}
		</tr>
	);
}
ListHeader.propTypes = {
	columns: React.PropTypes.arrayOf(
		React.PropTypes.shape(
			{ label: React.PropTypes.string },
		)
	),
};


/**
 * @param {object} props react props
 * @example
<DisplayTable name="Hello world"></DisplayTable>
 */
function DisplayTable(props) {
	const className = classnames(
		'table',
		'talend-component-list-display-table',
		theme.table,
	);
	return (
		<table className={className}>
			<thead>
				<ListHeader columns={props.columns} />
			</thead>
			<tbody>
				{props.items.map(
					(item, index) => (
						<RowRenderer
							key={index}
							row={item}
							columns={props.columns}
						/>
					)
				)}
			</tbody>
		</table>
	);
}

DisplayTable.propTypes = {
	items: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
	columns: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
};

export default DisplayTable;
