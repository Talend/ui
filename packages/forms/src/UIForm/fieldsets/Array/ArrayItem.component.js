import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@talend/react-components/lib/Icon';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_FORMS from '../../../constants';
import { DEFAULT_I18N, getDefaultTranslate } from '../../../translate';

import theme from './ArrayItem.scss';

export function ReorderButton(props) {
	const { index, hasMoveDown, hasMoveUp, id, isMoveDown, onReorder, t } = props;
	let buttonProps;
	let iconTransform;

	if (isMoveDown) {
		buttonProps = {
			id: id && `${id}-moveDown`,
			disabled: !hasMoveDown,
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
			disabled: !hasMoveUp,
			onClick: event =>
				onReorder(event, {
					previousIndex: index,
					nextIndex: index - 1,
				}),
			title: t('ARRAY_ITEM_MOVE_UP', { defaultValue: 'Move up' }),
		};
	}

	return (
		<button {...buttonProps} type="button">
			<Icon name="talend-caret-down" transform={iconTransform} />
		</button>
	);
}

ReorderButton.defaultProps = {
	t: getDefaultTranslate,
};
if (process.env.NODE_ENV !== 'production') {
	ReorderButton.propTypes = {
		hasMoveDown: PropTypes.bool.isRequired,
		hasMoveUp: PropTypes.bool.isRequired,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		isMoveDown: PropTypes.bool,
		onReorder: PropTypes.func.isRequired,
		t: PropTypes.func.isRequired,
	};
}
const TranslatedReorderButton = translate(I18N_DOMAIN_FORMS, { i18n: DEFAULT_I18N })(ReorderButton);

function ArrayItem(props) {
	const { children, id, index, onRemove, onReorder, value } = props;

	return (
		<div className={classNames(theme['tf-array-item'], 'tf-array-item')}>
			{
				<div className={theme.control}>
					<button
						className={theme.delete}
						id={id && `${id}-delete`}
						onClick={event => onRemove(event, index)}
						title="Delete"
						type="button"
					>
						<Icon name="talend-trash" />
					</button>
					{!value.isClosed &&
						onReorder && [
							<TranslatedReorderButton {...props} index={index} />,
							<TranslatedReorderButton {...props} index={index} isMoveDown />,
						]}
				</div>
			}
			{children}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayItem.propTypes = {
		children: PropTypes.node,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		value: PropTypes.func.isRequired,
	};
}

export default ArrayItem;
