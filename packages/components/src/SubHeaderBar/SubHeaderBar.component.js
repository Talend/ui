import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';

function DetailsIcon({ iconFile }) {
	if (iconFile) {
		return (
			<span className={theme['subheader-file-icon-box']}>
				<Icon name={iconFile} className={theme['subheader-file-icon']} />
			</span>
		);
	}
	return null;
}

DetailsIcon.propTypes = {
	iconFile: PropTypes.string.isRequired,
};

function DetailsTitle({ title, subTitle, iconFile, onEdit }) {
	return (
		<div className={theme['subheader-details']}>
			<DetailsIcon iconFile={iconFile} />
			<span className={theme['subheader-details-text']}>
				<span className={theme['subheader-details-title']}>{title}</span>
				<Action
					name="action-edit-title"
					label="edit"
					icon="talend-pencil"
					onClick={onEdit}
					bsStyle="link"
					className={theme['subheader-details-pencil']}
					hideLabel
				/>
				{subTitle && <div className={theme['subheader-details-subtitle']}>{subTitle}</div>}
			</span>
		</div>
	);
}

DetailsTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	iconFile: PropTypes.string,
	onEdit: PropTypes.func.isRequired,
};

function EditTitle({ title, iconFile, inputTextValue, onSubmit, onCancel, onChange }) {
	return (
		<div className={theme['subheader-form-container']}>
			<DetailsIcon iconFile={iconFile} />
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
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onChange: PropTypes.func,
	inputTextValue: PropTypes.string,
};

function getComponentFromType(action) {
	if (action.type === 'action') {
		return <Action {...action} />;
	}
	if (action.type === 'component') {
		return action.component;
	}
	return null;
}

function SubHeaderBarActions({ actions, right, center, className }) {
	if (actions && Array.isArray(actions)) {
		return (
			<div className={theme[className]}>
				{actions.map(action => (
					<ActionBar.Content tag={action.tag} center={center} right={right}>
						{getComponentFromType(action)}
					</ActionBar.Content>
				))}
			</div>
		);
	}
	return null;
}

SubHeaderBarActions.propTypes = {
	actions: PropTypes.array,
	right: PropTypes.bool,
	center: PropTypes.bool,
	className: PropTypes.string,
};

function SubHeaderBar({
	onClickBackArrow,
	actionsCenter,
	actionsRight,
	editMode,
	className,
	...rest
}) {
	return (
		<div className={classNames(theme['subheader-container'], 'subheader-container', className)}>
			<ActionBar className={theme['subheader-navbar']}>
				<ActionBar.Content left>
					<Action
						id="backArrow"
						onClick={onClickBackArrow}
						label="backArrow"
						icon="talend-arrow-left"
						bsStyle="link"
						className={theme['subheader-back-button']}
						hideLabel
					/>
				</ActionBar.Content>
				{editMode ? <EditTitle {...rest} /> : <DetailsTitle {...rest} />}
				<SubHeaderBarActions
					actions={actionsCenter}
					className="subheader-center"
					center
					right={false}
				/>
				<SubHeaderBarActions
					actions={actionsRight}
					className="subheader-right"
					center={false}
					right
				/>
			</ActionBar>
		</div>
	);
}

SubHeaderBar.propTypes = {
	onClickBackArrow: PropTypes.func.isRequired,
	editMode: PropTypes.bool,
	actionsCenter: PropTypes.array,
	actionsRight: PropTypes.array,
	className: PropTypes.string,
};

SubHeaderBar.defaultProps = {
	editMode: true,
};

export default SubHeaderBar;
