import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@talend/react-components/lib/Icon';
import { Action } from '@talend/react-components/lib/Actions';
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
		iconTransform = 'rotate-270';
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
		iconTransform = 'rotate-90';
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
			<Icon name="talend-arrow-left" transform={iconTransform} />
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
	} = props;

	const widgetIsDisabled = disabled || valueIsUpdating;
	const deleteAction = {
		id: id && `${id}-delete`,
		onClick: event => onRemove(event, index),
		label: 'Delete',
		type: 'button',
		disabled: widgetIsDisabled,
		className: theme.delete,
		icon: 'talend-trash',
		hideLabel: true,
		link: true,
	};
	const actions = [deleteAction];
	return (
		<div
			className={classNames(theme['tf-array-item'], 'tf-array-item', {
				[fieldTemplateTheme.updating]: valueIsUpdating,
			})}
		>
			<div className={theme.control}>
				{!isClosed && onReorder && (
					<React.Fragment>
						<TranslatedReorderButton {...props} index={index} disabled={widgetIsDisabled} />
						<TranslatedReorderButton
							{...props}
							index={index}
							isMoveDown
							disabled={widgetIsDisabled}
						/>
					</React.Fragment>
				)}
			</div>
			{renderItem(index, { actions })}
			{!isCloseable && (
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
};

export default ArrayItem;
