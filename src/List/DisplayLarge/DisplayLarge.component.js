import React from 'react';

import theme from './DisplayLarge.scss';

function getColumnsData(columns, item) {
	return columns.map((column) => {
		const data = {
			label: column.label,
			value: item[column.key],
		};
		if (column.dateformat && data.value) {
			data.value = data.value.format(column.dateformat);
		}
		return data;
	});
}

function getTwoDim(columnsData) {
	return columnsData.filter((column, i) => i % 2 === 1).map(
		(column) => {
			const i = columnsData.indexOf(column);
			if (columnsData.length > i + 1) {
				return [column, columnsData[i + 1]];
			}
			return [column];
		}
	);
}

function rowRenderer(item, index, columns) {
	const columnsData = getColumnsData(columns, item);
	const info = getTwoDim(columnsData);

	return (
		<div className="panel panel-default">
			<button className="btn btn-link" role="link" onClick={item.onClick}>
				{columnsData[0].value}
			</button>
			<div className="btn-group">
				<button>action 1</button>
				<button>action 2</button>
			</div>
			<div className={theme.streamrow}>
				{info.map((group, i) => (
					<ul key={i}>
					{group.map((item, j) => (
						<li key={j}>
							<span className={theme.streamlabel}>{item.label}</span>
							<span className={theme.streamvalue}>{item.value}</span>
						</li>
					))}
					</ul>
				))}
			</div>
		</div>
	);
}

/**
 * @param {object} props react props
 * @example
<DisplayLarge name="Hello world"></DisplayLarge>
 */
function DisplayLarge(props) {
	const items = props.items || [];
	return (
		<div className={theme.container}>
			{items.map((item, index) => {
				return rowRenderer(item, index, props.columns);
			})}
		</div>
	);
}

DisplayLarge.propTypes = {
	items: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
	columns: React.PropTypes.arrayOf(
		React.PropTypes.object
	),
};

export default DisplayLarge;
