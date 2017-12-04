import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../Actions';
import theme from './SubHeaderBar.scss';
import Icon from '../Icon';

function DetailsTitle({ title, subTitle, iconFile, onEdit }) {
	return (
		<div className={theme['subheader-details']}>
			{iconFile && <Icon name={iconFile} className={theme['subheader-file-icon']} />}
			<span className={theme['subheader-details-text']}>
				<span className={theme['subheader-details-title']}>
					{title}
					{onEdit && (
						<Action
							name="action-edit-title"
							label="edit"
							icon="talend-pencil"
							onClick={onEdit}
							bsStyle="link"
							className={theme['subheader-details-pencil']}
							hideLabel
						/>
					)}
				</span>
				{subTitle && <div className={theme['subheader-details-subtitle']}>{subTitle}</div>}
			</span>
		</div>
	);
}

DetailsTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	iconFile: PropTypes.string,
	onEdit: PropTypes.func,
};

function EditTitle({ title, iconFile, inputTextValue, onSubmit, onCancel, onChange }) {
	return (
		<div className={theme['subheader-form-container']}>
			{iconFile && <Icon name={iconFile} className={theme['subheader-file-icon']} />}
			<form className={theme['subheader-form']}>
				<input
					type="text"
					className={classNames(theme['subheader-input'], 'form-control')}
					id="inputTitle"
					placeholder={title}
					onChange={onChange}
					value={inputTextValue}
				/>
			</form>
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
		</div>
	);
}

EditTitle.propTypes = {
	title: PropTypes.string.isRequired,
	iconFile: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	onChange: PropTypes.func,
	inputTextValue: PropTypes.string,
};

function InpuSubHeaderBar(props) {
	return props.editMode ? <EditTitle {...props} /> : <DetailsTitle {...props} />;
}

InpuSubHeaderBar.propTypes = {
	editMode: PropTypes.bool.isRequired,
};

InpuSubHeaderBar.defaultProps = {
	editMode: false,
};

export { InpuSubHeaderBar as default, EditTitle, DetailsTitle };
