import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../RecordsViewer.scss';
import { SimpleTextKeyValue } from '../../Text';
import Icon from '../../../Icon';

export function RecordsViewerLeaf({
	dataKey,
	value,
	renderLeafAdditionalValue,
	className,
	nodeHighlighted,
	displayTypes,
	measure,
}) {
	const ref = React.createRef();
	const [isValueOverflown, setIsValueOverflown] = useState(false);
	const [isLongValueExpanded, setIsLongValueExpanded] = useState(false);

	useLayoutEffect(() => {
		if (ref.current.offsetParent.offsetWidth < ref.current.scrollWidth) {
			setIsValueOverflown(true);
		}
	}, []);

	useLayoutEffect(() => {
		measure();
	}, [isLongValueExpanded]);

	return (
		<div
			className={classNames(theme['tc-records-viewer-leaf'], 'tc-records-viewer-leaf', className, {
				[theme['tc-records-viewer-leaf-highlighted']]: nodeHighlighted,
				'tc-records-viewer-leaf-highlighted': nodeHighlighted,
			})}
		>
			{isValueOverflown && (
				<span
					className={classNames(theme['tc-leaf-overflow-icon'], 'tc-leaf-overflow-icon', className)}
				>
					<Icon
						className={classNames(theme['tc-leaf-overflow-icon-chevron'], {
							[theme['tc-leaf-overflow-icon-chevron-filled']]: isLongValueExpanded,
						})}
						key="Icon"
						name="talend-chevron-left"
						onClick={e => {
							e.stopPropagation();
							setIsLongValueExpanded(val => !val);
						}}
						title=""
						transform={isLongValueExpanded ? 'rotate-90' : 'rotate-270'}
					/>
				</span>
			)}
			{renderLeafAdditionalValue && renderLeafAdditionalValue(value)}
			<SimpleTextKeyValue
				ref={ref}
				formattedKey={dataKey}
				value={value.data}
				schema={value.schema}
				displayTypes={displayTypes}
				isValueOverflown={isValueOverflown}
				isLongValueToggled={isLongValueExpanded}
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
	measure: PropTypes.func.isRequired,
};

export default RecordsViewerLeaf;
