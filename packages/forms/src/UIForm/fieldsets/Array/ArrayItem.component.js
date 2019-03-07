import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@talend/react-components/lib/Icon';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './ArrayItem.scss';
import fieldTemplateTheme from '../../fields/FieldTemplate/FieldTemplate.scss';

export function ReorderButton(props) {
	const { disabled, index, hasMoveDown, hasMoveUp, id, isMoveDown, onReorder, t } = props;
	let buttonProps;
	let iconTransform;

	if (isMoveDown) {
		buttonProps = {
			id: id && `${id}-moveDown`,
			disabled: disabled || !hasMoveDown,
			onClick: event =>
				props.onReorder(event, {
					previousIndex: index,
					nextIndex: index + 1,
				}),
			title: t('ARRAY_ITEM_MOVE_DOWN', { defaultValue: 'Move down' }),
		};
	} else {
		iconTransform = 'flip-vertical';
		buttonProps = {
			id: id && `${id}-moveUp`,
			disabled: disabled || !hasMoveUp,
			onClick: event =>
				onReorder(event, {
					previousIndex: index,
					nextIndex: index - 1,
				}),
			title: t('ARRAY_ITEM_MOVE_UP', { defaultValue: 'Move up' }),
		};
	}

	return (
		<button
			{...buttonProps}
			className={`${theme['tf-array-item-reorder']} tf-array-item-reorder`}
			type="button"
		>
			<Icon name="talend-caret-down" transform={iconTransform} />
		</button>
	);
}

ReorderButton.defaultProps = {
	t: getDefaultT(),
};
if (process.env.NODE_ENV !== 'production') {
	ReorderButton.propTypes = {
		disabled: PropTypes.bool,
		hasMoveDown: PropTypes.bool.isRequired,
		hasMoveUp: PropTypes.bool.isRequired,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		isMoveDown: PropTypes.bool,
		onReorder: PropTypes.func.isRequired,
		t: PropTypes.func.isRequired,
	};
}
const TranslatedReorderButton = translate(I18N_DOMAIN_FORMS)(ReorderButton);

function ArrayItem(props) {
	const { children, disabled, id, index, onRemove, onReorder, isClosed, valueIsUpdating } = props;
	const widgetIsDisabled = disabled || valueIsUpdating;
	return (
		<div
			className={classNames(theme['tf-array-item'], 'tf-array-item', {
				[fieldTemplateTheme.updating]: valueIsUpdating,
			})}
		>
			<div className={theme.control}>
				{!isClosed &&
					onReorder && [
						<TranslatedReorderButton
							{...props}
							key="up"
							index={index}
							disabled={widgetIsDisabled}
						/>,
						<TranslatedReorderButton
							{...props}
							key="down"
							index={index}
							isMoveDown
							disabled={widgetIsDisabled}
						/>,
					]}
			</div>
			{children}
			{widgetIsDisabled}
			<div className={theme.control}>
				<button
					className={theme.delete}
					id={id && `${id}-delete`}
					onClick={event => onRemove(event, index)}
					title="Delete"
					type="button"
					disabled={widgetIsDisabled}
				>
					<Icon name="talend-cross" />
				</button>
			</div>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayItem.propTypes = {
		children: PropTypes.node,
		disabled: PropTypes.bool,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		isClosed: PropTypes.bool,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		valueIsUpdating: PropTypes.bool,
	};
}

export default ArrayItem;
