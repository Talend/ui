import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './InputTitleSubHeader.scss';
import Icon from '../../Icon';

function DetailsTitle({ title, subTitle, onEdit }) {
	return (
		<span className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
			<span className={theme['subheader-details-title-icon-container']}>
				<h1 className={classNames(theme['subheader-details-title'], 'subheader-details-title')}>
					{title}
				</h1>
				{onEdit && (
					<Action
						name="action-edit-title"
						label="Modify"
						icon="talend-pencil"
						onClick={onEdit}
						bsStyle="link"
						className={theme['subheader-details-pencil']}
					/>
				)}
			</span>
			{subTitle && (
				<small
					className={classNames(theme['subheader-details-subtitle'], 'subheader-details-subtitle')}
				>
					{subTitle}
				</small>
			)}
		</span>
	);
}

DetailsTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	onEdit: PropTypes.func,
};

function onFocus(event) {
	event.target.selectionStart = 0; // eslint-disable-line no-param-reassign
	event.target.selectionEnd = event.target.value.length; // eslint-disable-line no-param-reassign
}

function EditTitle({ title, inputTextValue, onSubmit, onCancel, onChange, focus }) {
	return (
		<form className={classNames(theme['tc-subheader-form'], 'tc-subheader-form')}>
			<input
				id="inputTitle"
				type="text"
				className={classNames(theme['subheader-input'], 'form-control')}
				onChange={onChange}
				value={inputTextValue || title}
				onFocus={onFocus}
				autoFocus={focus}
			/>
			<div className={theme['subheader-form-icon-container']}>
				<Action
					name="action-submit-title"
					label="submit"
					icon="talend-check"
					onClick={onSubmit}
					bsStyle="link"
					className={theme['subheader-form-icon']}
					hideLabel
				/>
				<Action
					name="action-cancel-title"
					label="cancel"
					icon="talend-cross"
					onClick={onCancel}
					bsStyle="link"
					className={theme['subheader-form-icon']}
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
};

EditTitle.defaultProps = {
	focus: true,
};

function InputTitleSubHeader({ title, iconFile, editMode, ...rest }) {
	return (
		<div className={theme['tc-subheader-details']}>
			{iconFile && (
				<Icon
					name={iconFile}
					className={classNames(theme['tc-subheader-title-icon'], 'tc-subheader-title-icon')}
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
	editMode: false,
};

export { InputTitleSubHeader as default, EditTitle, DetailsTitle, onFocus };
