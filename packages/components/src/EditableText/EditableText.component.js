import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import Skeleton from '../Skeleton';
import { Action } from '../Actions';
import InlineForm from './InlineForm.component';
import theme from './EditableText.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';

function PlainTextTitle({ onEdit, disabled, text, inProgress, t }) {
	return (
		<div>
			<button
				className={classNames(
					theme['tc-editable-text-text-wording-button'],
					'tc-editable-text-text-wording-button',
					'btn',
					'btn-link',
				)}
				onDoubleClick={onEdit}
				disabled={disabled || inProgress}
			>
				{text}
			</button>
			<Action
				name="action-edit"
				label={t('MODIFY_TOOLTIP', { defaultValue: 'Edit' })}
				icon="talend-pencil"
				onClick={onEdit}
				bsStyle="link"
				className={classNames(
					theme['tc-editable-text-text-pencil'],
					'tc-editable-text-text-pencil',
				)}
				disabled={disabled || inProgress}
				hideLabel
			/>
		</div>
	);
}

PlainTextTitle.propTypes = {
	text: PropTypes.string.isRequired,
	onEdit: PropTypes.bool,
	disabled: PropTypes.bool,
	inProgress: PropTypes.bool,
	t: PropTypes.func,
};

function EditableText({ editMode, loading, inProgress, ...rest }) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}

	const Component = editMode ? InlineForm : PlainTextTitle;
	return (
		<div
			className={classNames(theme['tc-editable-text'], 'tc-editable-text', {
				[theme['tc-editable-text-blink']]: inProgress,
				'tc-editable-text-blink': inProgress,
			})}
		>
			<Component inProgress={inProgress} {...rest} />
		</div>
	);
}

EditableText.displayName = 'EditableText';

EditableText.propTypes = {
	text: PropTypes.string.isRequired,
	editMode: PropTypes.bool,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
	onEdit: PropTypes.bool,
	disabled: PropTypes.bool,
	t: PropTypes.func,
};

EditableText.defaultProps = {
	editMode: false,
	loading: false,
	inProgress: false,
};

export default translate(I18N_DOMAIN_COMPONENTS)(EditableText);
