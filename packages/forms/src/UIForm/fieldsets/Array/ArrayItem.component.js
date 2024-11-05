import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ButtonIcon } from '@talend/design-system';

import { I18N_DOMAIN_FORMS } from '../../../constants';

import theme from './ArrayItem.module.scss';

export function ReorderButton(props) {
	const { disabled, index, hasMoveDown, hasMoveUp, id, isMoveDown, onReorder } = props;
	let buttonProps;
	let label;
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
			icon: 'arrow-bottom',
		};
		label = t('ARRAY_ITEM_MOVE_DOWN', { defaultValue: 'Move down' });
	} else {
		buttonProps = {
			id: id && `${id}-moveUp`,
			disabled: disabled || !hasMoveUp,
			onClick: event =>
				onReorder(event, {
					previousIndex: index,
					nextIndex: index - 1,
				}),
			icon: 'arrow-top',
		};
		label = t('ARRAY_ITEM_MOVE_UP', { defaultValue: 'Move up' });
	}

	return (
		<ButtonIcon {...buttonProps} size="XS">
			{label}
		</ButtonIcon>
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
		disabled: widgetIsDisabled,
		icon: 'trash',
		tooltip: t('ARRAY_ITEM_DELETE', 'Delete'),
	};
	const actions = [];
	if (!readOnly) {
		actions.push(deleteAction);
	}
	return (
		<div className={classNames(theme['tf-array-item'], 'tf-array-item')}>
			<div className={theme.control}>
				{!isClosed && onReorder && !readOnly && (
					<Fragment>
						<ReorderButton {...props} index={index} disabled={widgetIsDisabled} />
						<ReorderButton {...props} index={index} isMoveDown disabled={widgetIsDisabled} />
					</Fragment>
				)}
			</div>
			{renderItem(index, { actions })}
			{!isCloseable && !readOnly && !disabled && (
				<div className={theme.delete}>
					<ButtonIcon {...deleteAction}>
						{t('ARRAY_FIELD_TEMPLATE_ACTION_DELETE', { defaultValue: 'Delete' })}
					</ButtonIcon>
				</div>
			)}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayItem.propTypes = {
		renderItem: PropTypes.func,
		disabled: PropTypes.bool,
		readOnly: PropTypes.bool,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		isClosed: PropTypes.bool,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func,
		valueIsUpdating: PropTypes.bool,
		isCloseable: PropTypes.bool,
	};
}

ArrayItem.defaultProps = {
	isCloseable: false,
	renderItem: () => null,
};

export default ArrayItem;
