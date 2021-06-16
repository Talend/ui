import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import union from 'lodash/union';

import toFlat from '../toflat';
import JSONLike from '../JSONLike';
import theme from './Table.scss';

/**
 * @param {Object} data
 * @param {Bool} isFlat
 * @return {Array<String>}
 */
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

export function getHeaders(keys, isFlat, baseId) {
	return keys.map(key => {
		// This transforms $['id'][0]['foo'] into id[0].foo
		const adaptedKey = isFlat
			? key
					.replace(/^\$\['/g, '')
					.replace(/']\['/g, '.')
					.replace(/]\['/g, '].')
					.replace(/']\[/g, '[')
					.replace(/']/g, '')
			: key;
		return {
			id: `${baseId}-${adaptedKey}`,
			key,
			header: adaptedKey,
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
	/**
	 * because we want to display all the possible table header keys
	 * for each row of the dataset we try to find each possible key
	 * and merge them into a array of unique values
	 * this may not be performant or good UX for huge heterogenous datasets
	 * because it require to run a recursive exploratory function on each member of the dataset
	 * and it may show to many column to the end user
	 */
	const keys = dataset.reduce(
		(accumulator, currentValue) => union(getKeys(currentValue, flat), accumulator),
		[],
	);
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
