import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './InputTitleSubHeader.scss';
import Icon from '../../Icon';

function DetailsTitle({ title, subTitle, onEdit }) {
	return (
		<span className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
			<span className={theme['subheader-details-title']}>
				{title}
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
			{subTitle && <div className={theme['subheader-details-subtitle']}>{subTitle}</div>}
		</span>
	);
}

DetailsTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	onEdit: PropTypes.func,
};

function EditTitle({ title, inputTextValue, onSubmit, onCancel, onChange }) {
	return (
		<form className={classNames(theme['tc-subheader-form'], 'tc-subheader-form')}>
			<input
				id="inputTitle"
				type="text"
				className={classNames(theme['subheader-input'], 'form-control')}
				placeholder={title}
				onChange={onChange}
				value={inputTextValue}
			/>
			<div className={theme['subheader-form-icon']}>
				<Action
					name="action-submit-title"
					label="submit"
					icon="talend-check"
					onClick={onSubmit}
					bsStyle="link"
					hideLabel
				/>
				<Action
					name="action-cancel-title"
					label="cancel"
					icon="talend-cross"
					onClick={onCancel}
					bsStyle="link"
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
	inputTextValue: PropTypes.string,
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
	editMode: true,
};

export { InputTitleSubHeader as default, EditTitle, DetailsTitle };
