import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../RecordsViewer.scss';
import { SimpleTextKeyValue } from '../../Text';

export function RecordsViewerLeaf({ dataKey, getQuality, t, value, renderLeafQuality, ...props }) {
	return (
		<div
			className={classNames(
				theme['tc-records-viewer-leaf'],
				'tc-records-viewer-leaf',
				props.className,
				{
					[theme['tc-records-viewer-leaf-highlighted']]: props.nodeHighlighted,
					'tc-records-viewer-leaf-highlighted': props.nodeHighlighted,
				},
			)}
		>
			{renderLeafQuality && { quality: getQuality(value) }}
			<SimpleTextKeyValue
				formattedKey={`${dataKey}:`}
				value={value.data}
				schema={value.schema}
				separator={' '}
			/>
		</div>
	);
}

RecordsViewerLeaf.propTypes = {
	className: PropTypes.string,
	dataKey: PropTypes.string,
	getQuality: PropTypes.func.isRequired,
	nodeHighlighted: PropTypes.bool,
	level: PropTypes.number,
	t: PropTypes.func.isRequired,
	value: PropTypes.shape({
		data: PropTypes.object,
		schema: PropTypes.object,
	}),
	renderLeafQuality: PropTypes.func,
};

export default RecordsViewerLeaf;
