import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';
import { SimpleTextKeyValue } from '../../Text';
import { ActionButton } from '../../../Actions';
import theme from '../RecordsViewer.scss';

export function RecordsViewerLeaf({
	dataKey,
	value,
	renderLeafAdditionalValue,
	className,
	nodeHighlighted,
	displayTypes,
	typesRenderer,
	measure,
	t,
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

	const label = isLongValueExpanded
		? t('RECORDS_LEAF_LONG_VALUE_LABEL_COLLAPSE', { defaultValue: 'Collapse the value' })
		: t('RECORDS_LEAF_LONG_VALUE_LABEL_EXPAND', { defaultValue: 'Expand the value' });

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
					<ActionButton
						icon="talend-chevron-left"
						iconTransform={isLongValueExpanded ? 'rotate-90' : 'rotate-270'}
						link
						hideLabel
						label={label}
						className={classNames(theme['tc-leaf-overflow-icon-chevron'], {
							[theme['tc-leaf-overflow-icon-chevron-filled']]: isLongValueExpanded,
						})}
						onClick={e => {
							e.stopPropagation();
							setIsLongValueExpanded(val => !val);
						}}
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
				typesRenderer={typesRenderer}
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
		data: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool,
		]),
		schema: PropTypes.object,
	}),
	renderLeafAdditionalValue: PropTypes.func,
	displayTypes: PropTypes.bool,
	typesRenderer: PropTypes.func,
	measure: PropTypes.func.isRequired,
	t: PropTypes.func,
};

RecordsViewerLeaf.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(RecordsViewerLeaf);
