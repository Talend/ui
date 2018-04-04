import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function RowLabel({ element, dataKey, rowDataGetter, classNameProvider }) {
	const data = rowDataGetter.getData(element, dataKey);
	return (
		<div
			className={`comp-list-row-data row-label ${classnames(
				classNameProvider.get(element, dataKey),
			)}`}
		>
			{data}
		</div>
	);
}

RowLabel.propTypes = {
	element: PropTypes.object,
	dataKey: PropTypes.string,
	classNameProvider: PropTypes.object,
	rowDataGetter: PropTypes.object,
};
