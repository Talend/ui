import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import Skeleton from '../Skeleton';
import { Action } from '../Actions';
import InlineForm from './InlineForm.component';
import theme from './EditableText.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';


function EditableText({
	text,
	editMode,
	loading,
	inProgress,
	onEdit,
	disabled,
	t,
	...rest
}) {
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}

	return (
		<div
			className={classNames(
				theme['tc-editable-text'],
				'tc-editable-text',
				{
					[theme['tc-editable-text-blink']]: inProgress,
					'tc-editable-text-blink': inProgress,
				},
			)}
		>
			{editMode ? (
				<InlineForm text={text} {...rest} />
			) : (
				<div>
					<button
						className={classNames(
							theme['tc-editable-text-text-title-wording-button'],
							'tc-editable-text-text-title-wording-button',
							'btn',
							'btn-link',
						)}
						onDoubleClick={onEdit}
						disabled={disabled}
					>
						{ text }
					</button>
					<Action
						name="action-edit-title"
						label={t('MODIFY_TOOLTIP', { defaultValue: 'Edit' })}
						icon="talend-pencil"
						onClick={onEdit}
						bsStyle="link"
						className={classNames(
							theme['tc-editable-text-text-title-pencil'],
							'tc-editable-text-text-title-pencil',
						)}
						disabled={disabled}
						hideLabel
					/>
				</div>
			)}
		</div>
	);
}

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
