import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import { SimpleTextKeyValue } from '../../Text';
import theme from '../ModelViewer.scss';

/**
 * Union with only two type and one null, are represent as leaf.
 * So here we are adding a * to show which leaf are mandatory.
 * The other ones, with no *, are the union with one null type.
 * @param {object} item
 */
export function isOptional(item) {
	if (item.optional) {
		return '';
	}
	return '*';
}

/**
 * Render leaf model.
 */
export function ModelViewerLeaf({
	className,
	dataKey,
	getDisplayKey,
	getDisplayValue,
	hasSemanticAwareness,
	jsonpath,
	jsonPathSelection,
	level,
	getQuality,
	onSelect,
	t,
	value,
	renderSemanticChooser,
	renderQualities,
}) {
	const onClickLeaf = event => {
		if (onSelect) {
			onSelect(event, jsonpath, value);
		}
	};

	const ariaLabelButton = t('MODEL_VIEWER_LEAF_BUTTON_ARIA_LABEL_SELECT', {
		defaultValue: 'Select',
	});
	const formattedKey = getDisplayValue(value);
	const formattedValue = hasSemanticAwareness ? `${getDisplayKey(value)}${isOptional(value)}` : '';
	const separator = ' ';

	const SemanticChooserButtonProps = {
		classAction: classNames(theme['tc-model-leaf-options-burger'], 'tc-model-leaf-options-burger'),
		dqType: get(value, 'type.dqType', value.type.type),
		id: getDisplayValue(value),
		matchings: value.matchings,
		path: value.path,
		placement: 'right',
	};

	return (
		<span
			className={classNames(className, theme['tc-model-leaf'], 'tc-model-leaf', {
				[theme['tc-model-leaf-padding-left']]: level > 0,
				'tc-model-leaf-padding-left': level > 0,
			})}
		>
			<button
				aria-label={`${ariaLabelButton} ${dataKey} (${jsonpath})`}
				title={`${formattedKey || ''}${formattedValue ? `${separator}${formattedValue}` : ''}`}
				className={classNames(
					{
						[theme['tc-model-leaf-button-highlighted']]: jsonpath === jsonPathSelection,
						'tc-model-leaf-button-highlighted': jsonpath === jsonPathSelection,
					},
					theme['tc-model-leaf-button'],
					'tc-model-leaf-button',
				)}
				key="main"
				onClick={onClickLeaf}
			/>
			<SimpleTextKeyValue
				formattedKey={formattedKey}
				value={formattedValue}
				separator={separator}
			/>

			<span className={classNames(theme['tc-model-leaf-options'], 'tc-model-leaf-options')}>
				{renderSemanticChooser && renderSemanticChooser(...SemanticChooserButtonProps)}
				{renderQualities && renderQualities({ qualities: getQuality(value) })}
			</span>
		</span>
	);
}

ModelViewerLeaf.propTypes = {
	className: PropTypes.string,
	dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	datasetId: PropTypes.string,
	getDisplayKey: PropTypes.func,
	getDisplayValue: PropTypes.func.isRequired,
	getQuality: PropTypes.func.isRequired,
	hasSemanticAwareness: PropTypes.bool,
	jsonpath: PropTypes.string.isRequired,
	jsonPathSelection: PropTypes.string,
	level: PropTypes.number,
	onSelect: PropTypes.func,
	t: PropTypes.func.isRequired,
	value: PropTypes.object,
	renderSemanticChooser: PropTypes.func,
	renderQualities: PropTypes.func,
};

export default ModelViewerLeaf;
