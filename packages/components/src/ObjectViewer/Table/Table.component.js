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

function getHeaderIds(baseId, keys) {
	if (!baseId) {
		return [];
	}

	return keys.reduce((accu, key) => {
		// eslint-disable-next-line no-param-reassign
		accu[key] = `${baseId}-${key}`;
		return accu;
	}, {});
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
 * @param {array} headers keys
 * @param {object} schema
 * @param {object} headerIds The header ids by key
 */
export function buildContentHeaders(headers, schema, headerIds) {
	return headers.map((key, index) => {
		let type;
		if (schema) {
			type = schema.get(key);
		}
		if (!type) {
			return (
				<th key={index} id={headerIds[key]}>
					{key}
				</th>
			);
		}
		return (
			<th key={index} id={headerIds[key]}>
				<div>{key}</div>
				<div className={classNames('text-right')}>{type}</div>
			</th>
		);
	});
}

function Table({ flat, data, title, ...props }) {
	if (!Array.isArray(data) && !Array.isArray(data.dataset)) {
		return null;
	}

	// The datas can be an array or an array in an object. We assign the value correctly here.
	const dataset = Array.isArray(data) ? data : data.dataset;
	const keys = getKeys(dataset[0], flat);
	const headerIds = getHeaderIds(props.id, keys);
	const headers = getHeaders(keys, flat, data.schema);
	const tableClassName = classNames(
		theme.table,
		'tc-object-viewer',
		'table table-bordered table-striped table-hover',
	);

	return (
		<table className={tableClassName} id={props.id}>
			<caption className="sr-only">{title}</caption>
			<thead>
				<tr>{buildContentHeaders(headers, data.schema, headerIds)}</tr>
			</thead>
			<tbody>
				{dataset.map((row, index) => {
					const flattenRow = flat ? toFlat(row) : row;
					return (
						<tr key={index}>
							{keys.map((key, j) => {
								const path = getAbsolutePath(index, key, flat);
								return (
									<td key={j} headers={headerIds[key]}>
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
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
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
