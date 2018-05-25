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
		return keys.map(str =>
			str
				.replace(/^\$\['/g, '')
				.replace(/']\['/g, '.')
				.replace(/]\['/g, '].')
				.replace(/']\[/g, '[')
				.replace(/']/g, ''),
		);
	}
	return keys;
}

/**
 * We construct the jsx dispayed for the header.
 * If there is a type we add it.
 * @param {array} headers
 */
export function buildContentHeaders(headers, schema) {
	return headers.map((key, index) => {
		let type;
		if (schema) {
			type = schema.get(key);
		}
		if (!type) {
			return <td key={index}>{key}</td>;
		}
		return (
			<td key={index}>
				<div>{key}</div>
				<div className={classNames('text-right')}>{type}</div>
			</td>
		);
	});
}

function Table({ flat, data, ...props }) {
	if (!Array.isArray(data) && !Array.isArray(data.dataset)) {
		return null;
	}

	// The datas can be an array or an array in an object. We assign the value correctly here.
	const dataset = Array.isArray(data) ? data : data.dataset;
	const keys = getKeys(dataset[0], flat);
	const headers = getHeaders(keys, flat, data.schema);
	const tableClassName = classNames(
		theme.table,
		'tc-object-viewer',
		'table table-bordered table-striped table-hover',
	);

	return (
		<table className={tableClassName}>
			<thead>
				<tr>{buildContentHeaders(headers, data.schema)}</tr>
			</thead>
			<tbody>
				{dataset.map((row, index) => {
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
											nativeValueClassName={theme.nativevalue}
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
	]).isRequired,
};

export default Table;
