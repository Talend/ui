import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../RecordsViewer.scss';
import { SimpleTextKeyValue } from '../../Text';

export function RecordsViewerLeaf({
	dataKey,
	value,
	renderLeafAdditionalValue,
	className,
	nodeHighlighted,
	displayTypes,
}) {
	return (
		<div
			className={classNames(theme['tc-records-viewer-leaf'], 'tc-records-viewer-leaf', className, {
				[theme['tc-records-viewer-leaf-highlighted']]: nodeHighlighted,
				'tc-records-viewer-leaf-highlighted': nodeHighlighted,
			})}
		>
			{renderLeafAdditionalValue && renderLeafAdditionalValue(value)}
			<SimpleTextKeyValue
				formattedKey={`${dataKey}`}
				value={value.data}
				schema={value.schema}
				displayTypes={displayTypes}
			/>
		</div>
	);
}

RecordsViewerLeaf.propTypes = {
	className: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	nodeHighlighted: PropTypes.bool,
	value: PropTypes.shape({
		data: PropTypes.object,
		schema: PropTypes.object,
	}),
	renderLeafAdditionalValue: PropTypes.func,
	displayTypes: PropTypes.bool,
};

export default RecordsViewerLeaf;
