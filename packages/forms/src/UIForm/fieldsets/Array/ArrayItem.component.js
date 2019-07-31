import PropTypes from 'prop-types';
import React from 'react';
import { Action } from '@talend/react-components/lib/Actions';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../../constants';

import theme from './ArrayItem.scss';
import fieldTemplateTheme from '../../fields/FieldTemplate/FieldTemplate.scss';

export function ReorderButton(props) {
	const { disabled, index, hasMoveDown, hasMoveUp, id, isMoveDown, onReorder } = props;
	let buttonProps;
	const { t } = useTranslation(I18N_DOMAIN_FORMS);

	if (isMoveDown) {
		buttonProps = {
			id: id && `${id}-moveDown`,
			disabled: disabled || !hasMoveDown,
			onClick: event =>
				props.onReorder(event, {
					previousIndex: index,
					nextIndex: index + 1,
				}),
			label: t('ARRAY_ITEM_MOVE_DOWN', { defaultValue: 'Move down' }),
			iconTransform: 'rotate-270',
		};
	} else {
		buttonProps = {
			id: id && `${id}-moveUp`,
			disabled: disabled || !hasMoveUp,
			onClick: event =>
				onReorder(event, {
					previousIndex: index,
					nextIndex: index - 1,
				}),
			label: t('ARRAY_ITEM_MOVE_UP', { defaultValue: 'Move up' }),
			iconTransform: 'rotate-90',
		};
	}

	return (
		<Action
			{...buttonProps}
			className={`${theme['tf-array-item-reorder']} tf-array-item-reorder`}
			icon="talend-arrow-left"
			link
			hideLabel
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ReorderButton.propTypes = {
		disabled: PropTypes.bool,
		hasMoveDown: PropTypes.bool.isRequired,
		hasMoveUp: PropTypes.bool.isRequired,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		isMoveDown: PropTypes.bool,
		onReorder: PropTypes.func.isRequired,
	};
}

function ArrayItem(props) {
	const {
		renderItem,
		disabled,
		id,
		index,
		onRemove,
		onReorder,
		isClosed,
		valueIsUpdating,
		isCloseable,
		readOnly,
	} = props;
	const { t } = useTranslation(I18N_DOMAIN_FORMS);

	const widgetIsDisabled = disabled || valueIsUpdating;
	const deleteAction = {
		id: id && `${id}-delete`,
		onClick: event => onRemove(event, index),
		label: t('ARRAY_FIELD_TEMPLATE_ACTION_DELETE', { defaultValue: 'Delete' }),
		type: 'button',
		disabled: widgetIsDisabled,
		className: theme.delete,
		icon: 'talend-trash',
		hideLabel: true,
		link: true,
	};
	const actions = [];
	if (!readOnly) {
		actions.push(deleteAction);
	}
	return (
		<div
			className={classNames(theme['tf-array-item'], 'tf-array-item', {
				[fieldTemplateTheme.updating]: valueIsUpdating,
			})}
		>
			<div className={theme.control}>
				{!isClosed && onReorder && !readOnly && (
					<React.Fragment>
						<ReorderButton {...props} index={index} disabled={widgetIsDisabled} />
						<ReorderButton {...props} index={index} isMoveDown disabled={widgetIsDisabled} />
					</React.Fragment>
				)}
			</div>
			{renderItem(index, { actions })}
			{!isCloseable && !readOnly && !disabled && (
				<div className={theme.control}>
					<Action {...deleteAction} />
				</div>
			)}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayItem.propTypes = {
		renderItem: PropTypes.func.isRequired,
		disabled: PropTypes.bool,
		readOnly: PropTypes.bool,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		isClosed: PropTypes.bool,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		valueIsUpdating: PropTypes.bool,
		isCloseable: PropTypes.bool,
	};
}

ArrayItem.defaultProps = {
	isCloseable: false,
	renderItem: () => null,
};

export default ArrayItem;
