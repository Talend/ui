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
	const isDisabled = disabled || inProgress;
	return (
		<div className={theme['tc-editable-text-title']}>
			<span
				className={classNames(theme['tc-editable-text-wording'], 'tc-editable-text-wording')}
				onDoubleClick={isDisabled ? undefined : onEdit}
			>
				{text}
			</span>
			<Action
				name="action-edit"
				label={t('EDITABLE_TEXT_EDIT', { defaultValue: 'Edit' })}
				icon="talend-pencil"
				onClick={onEdit}
				bsStyle="link"
				className={classNames(theme['tc-editable-text-pencil'], 'tc-editable-text-pencil')}
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
	const allyProps = {};
	if (inProgress) {
		allyProps['aria-label'] = rest.t('EDITABLE_TEXT_IN_PROGRESS', {
			defaultValue: 'Edition in progress',
		});
		allyProps['aria-busy'] = true;
	}
	return (
		<div
			className={classNames(theme['tc-editable-text'], 'tc-editable-text', {
				[theme['tc-editable-text-blink']]: inProgress,
				'tc-editable-text-blink': inProgress,
			})}
			{...allyProps}
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
