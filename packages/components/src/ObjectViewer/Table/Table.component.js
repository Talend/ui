import React, { PropTypes } from 'react';
import classNames from 'classnames';
import toFlat from '../toflat';
import JSONLike from '../JSONLike';
import theme from './Table.scss';

function getKeys(data, isFlat) {
	if (isFlat) {
		return Object.keys(toFlat(data));
	}
	return Object.keys(data);
}

function getAbsolutePath(index, key, flat) {
	return flat ? `$[${index}]${key.replace('$', '')}` : `$[${index}]['${key}']`;
}

function Table({ flat, data, ...props }) {
	if (!Array.isArray(data)) {
		return null;
	}
	const keys = getKeys(data[0], flat);
	const tableClassName = classNames(
		theme.table,
		'tc-object-viewer',
		'table table-bordered table-striped table-hover',
	);

	return (
		<table className={tableClassName}>
			<thead>
				<tr>
					{keys.map((key, index) => (<td key={index}>{key}</td>))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => {
					const flattenRow = flat ? toFlat(row) : row;
					return (
						<tr key={index}>
							{keys.map((key, j) => {
								const path = getAbsolutePath(index, key, flat);
								return (
									<td key={j}>
										<JSONLike
											data={flattenRow[key]}
											{...props}
											jsonpath={path}
										/>
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

Table.propTypes = {
	flat: PropTypes.boolean,
	data: PropTypes.oneOf([
		PropTypes.boolean,
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
};

export default Table;
