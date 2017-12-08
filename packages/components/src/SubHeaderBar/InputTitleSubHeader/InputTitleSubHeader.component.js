import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './InputTitleSubHeader.scss';
import { getDefaultTranslate } from '../../translate';
import Icon from '../../Icon';

function DetailsTitle({ title, subTitle, onEdit, t }) {
	const modifyLabel = t('MODIFY_TOOLTIP', { defaultValue: 'Modify' });
	return (
		<div className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
			<div
				className={classNames(
					theme['tc-subheader-details-text-title'],
					'tc-subheader-details-text-title',
				)}
			>
				<h1
					className={classNames(theme['tc-subheader-details-text-title-wording'], 'tc-subheader-details-text-title-wording')}
				>
					{title}
				</h1>
				{onEdit && (
					<Action
						name="action-edit-title"
						label={modifyLabel}
						icon="talend-pencil"
						onClick={onEdit}
						bsStyle="link"
						className={classNames(
							theme['tc-subheader-details-text-title-pencil'],
							'tc-subheader-details-text-title-pencil',
						)}
						hideLabel
					/>
				)}
			</div>
			{subTitle && (
				<small
					className={classNames(
						theme['tc-subheader-details-text-subtitle'],
						'tc-subheader-details-text-subtitle',
					)}
				>
					{subTitle}
				</small>
			)}
		</div>
	);
}

DetailsTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	onEdit: PropTypes.func,
	t: PropTypes.func,
};

DetailsTitle.defaultProps = {
	t: getDefaultTranslate,
};

function onFocus(event) {
	event.target.selectionStart = 0; // eslint-disable-line no-param-reassign
	event.target.selectionEnd = event.target.value.length; // eslint-disable-line no-param-reassign
}

function EditTitle({ title, inputTextValue, onSubmit, onCancel, onChange, focus, t }) {
	return (
		<form className={classNames(theme['tc-subheader-details-form'], 'tc-subheader-details-form')}>
			<input
				id="inputTitle"
				type="text"
				className={classNames(
					theme['tc-subheader-details-form-input'],
					'tc-subheader-details-form-input',
					'form-control',
				)}
				onChange={onChange}
				value={inputTextValue || title}
				onFocus={onFocus}
				autoFocus={focus}
			/>
			<div
				className={classNames(
					theme['tc-subheader-details-form-buttons'],
					'tc-subheader-details-form-buttons',
				)}
			>
				<Action
					name="action-submit-title"
					label={t('SUBMIT_TOOLTIP', { defaultValue: 'Submit' })}
					icon="talend-check"
					onClick={onSubmit}
					bsStyle="link"
					className={classNames(
						theme['tc-subheader-details-form-buttons-icon'],
						'tc-subheader-details-form-buttons-icon',
					)}
					hideLabel
				/>
				<Action
					name="action-cancel-title"
					label={t('CANCEL_TOOLTIP', { defaultValue: 'Cancel' })}
					icon="talend-cross"
					onClick={onCancel}
					bsStyle="link"
					className={classNames(
						theme['tc-subheader-details-form-buttons-icon'],
						'tc-subheader-details-form-buttons-icon',
					)}
					hideLabel
				/>
			</div>
		</form>
	);
}

EditTitle.propTypes = {
	title: PropTypes.string.isRequired,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	onChange: PropTypes.func,
	focus: PropTypes.bool,
	inputTextValue: PropTypes.string,
	t: PropTypes.func,
};

EditTitle.defaultProps = {
	focus: true,
	t: getDefaultTranslate,
};

function InputTitleSubHeader({ title, iconFile, editMode, ...rest }) {
	return (
		<div className={classNames(theme['tc-subheader-details'], 'tc-subheader-details')}>
			{iconFile && (
				<Icon
					name={iconFile}
					className={classNames(theme['tc-subheader-details-icon'], 'tc-subheader-details-icon')}
				/>
			)}
			{editMode ? <EditTitle title={title} {...rest} /> : <DetailsTitle title={title} {...rest} />}
		</div>
	);
}

InputTitleSubHeader.propTypes = {
	editMode: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	iconFile: PropTypes.string,
};

InputTitleSubHeader.defaultProps = {
	editMode: true,
};

export { InputTitleSubHeader as default, EditTitle, DetailsTitle, onFocus };
