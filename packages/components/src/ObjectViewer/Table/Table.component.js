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

function getHeaderId(baseId, key) {
	if (!baseId) {
		return null;
	}

	return `${baseId}-${key}`;
}

export function getHeaders(keys, isFlat, baseId) {
	return keys.map(key => {
		// $['id'][0]['foo'] -> id[0].foo
		const header = isFlat
			? key
					.replace(/^\$\['/g, '')
					.replace(/']\['/g, '.')
					.replace(/]\['/g, '].')
					.replace(/']\[/g, '[')
					.replace(/']/g, '')
			: key;
		return {
			id: getHeaderId(baseId, header),
			key,
			header,
		};
	});
}

/**
 * We construct the jsx dispayed for the header.
 * If there is a type we add it.
 * @param {array} headersDefinitions
 * @param {object} schema
 */
export function buildContentHeaders(headersDefinitions, schema) {
	return headersDefinitions.map(({ header, id }, index) => {
		let type;
		if (schema) {
			type = schema.get(header);
		}
		if (!type) {
			return (
				<th key={index} id={id}>
					{header}
				</th>
			);
		}
		return (
			<th key={index} id={id}>
				<div>{header}</div>
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
	const headers = getHeaders(keys, flat, props.id);
	const tableClassName = classNames(
		theme.table,
		'tc-object-viewer',
		'table table-bordered table-striped table-hover',
	);

	return (
		<table className={tableClassName} id={props.id}>
			<caption className="sr-only">{title}</caption>
			<thead>
				<tr>{buildContentHeaders(headers, data.schema)}</tr>
			</thead>
			<tbody>
				{dataset.map((row, index) => {
					const flattenRow = flat ? toFlat(row) : row;
					return (
						<tr key={index}>
							{headers.map(({ key, id }, j) => {
								const path = getAbsolutePath(index, key, flat);
								return (
									<td key={j} headers={id}>
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
Table.displayName = 'Table';
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
