import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import toFlat from '../toflat';
import JSONLike from '../JSONLike';
import theme from './Table.scss';

export function getKeys(data, isFlat) {
	if (isFlat) {
		return Object.keys(toFlat(data));
	}
	return Object.keys(data);
}

export function getAbsolutePath(index, key, flat) {
	if (flat) {
		return `$[${index}]${key.replace('$', '')}`;
	}
	return `$[${index}]['${key}']`;
}

export function getHeaders(keys, isFlat) {
	if (isFlat) {
		// $['id'][0]['foo'] -> id[0].foo
		return keys.map(str => str
			.replace('$[\'', '')
			.replace('\'][\'', '.')
			.replace('][\'', '].')
			.replace('\'][', '[')
			.replace('\']', '')
		);
	}
	return keys;
}

function Table({ flat, data, ...props }) {
	if (!Array.isArray(data)) {
		return null;
	}
	const keys = getKeys(data[0], flat);
	const headers = getHeaders(keys, flat);
	const tableClassName = classNames(
		theme.table,
		'tc-object-viewer',
		'table table-bordered table-striped table-hover',
	);

	return (
		<table className={tableClassName}>
			<thead>
				<tr>
					{headers.map((key, index) => (<td key={index}>{key}</td>))}
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
	flat: PropTypes.bool,
	data: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
};

export default Table;
