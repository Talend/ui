import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { omit } from 'lodash';
import Icon from '../Icon';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';

function DetailsIcon(props) {
	return (
		<span className={theme['subheader-file-icon-box']}>
			<Icon name={props.iconFile} className={theme['subheader-file-icon']} />
		</span>
	);
}

DetailsIcon.propTypes = {
	iconFile: PropTypes.string,
};

function DetailsTitle({ title, subTitle, iconFile, onEdit }) {
	return (
		<div className={theme['subheader-details']}>
			{iconFile && <DetailsIcon iconFile={iconFile} />}
			<span className={theme['subheader-details-text']}>
				<span className={theme['subheader-details-title']}>{title}</span>
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
			{iconFile && <DetailsIcon iconFile={iconFile} />}
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

function getComponentFromType(action) {
	if (!action) {
		return null;
	}
	const ACTION_PROPS_OMITTED = ['renderType', 'tag'];
	if (action.component) {
		return action.component;
	}
	if (action.renderType === 'action') {
		return <Action {...omit(action, ACTION_PROPS_OMITTED)} />;
	}
	return null;
}

function SubHeaderBarActions({ actions, right, center, className }) {
	return (
		<div className={className}>
			{actions.map((action, index) => (
				<ActionBar.Content key={index} tag={action.tag} center={center} right={right}>
					{getComponentFromType(action)}
				</ActionBar.Content>
			))}
		</div>
	);
}

SubHeaderBarActions.propTypes = {
	actions: PropTypes.array.isRequired,
	right: PropTypes.bool,
	center: PropTypes.bool,
	className: PropTypes.string,
};

function SubHeaderBar({ onGoBack, actionsCenter, actionsRight, editMode, className, ...rest }) {
	return (
		<div className={classNames(theme['subheader-container'], 'subheader-container', className)}>
			<ActionBar className={theme['subheader-navbar']}>
				<ActionBar.Content left>
					<Action
						id="backArrow"
						onClick={onGoBack}
						label="backArrow"
						icon="talend-arrow-left"
						bsStyle="link"
						className={theme['subheader-back-button']}
						hideLabel
					/>
				</ActionBar.Content>
				{editMode ? <EditTitle {...rest} /> : <DetailsTitle {...rest} />}
				{Array.isArray(actionsCenter) && (
					<SubHeaderBarActions
						actions={actionsCenter}
						className={classNames([`${theme['subheader-center']}`], {
							[`${theme['no-margin-right']}`]: actionsRight,
						})}
						center
						right={false}
					/>
				)}
				{Array.isArray(actionsRight) && (
					<SubHeaderBarActions
						actions={actionsRight}
						className={theme['subheader-right']}
						center={false}
						right
					/>
				)}
			</ActionBar>
		</div>
	);
}

SubHeaderBar.propTypes = {
	onGoBack: PropTypes.func.isRequired,
	editMode: PropTypes.bool,
	actionsCenter: PropTypes.array,
	actionsRight: PropTypes.array,
	className: PropTypes.string,
};

SubHeaderBar.defaultProps = {
	editMode: false,
};

export {
	SubHeaderBar as default,
	SubHeaderBarActions,
	EditTitle,
	DetailsTitle,
	DetailsIcon,
	getComponentFromType,
};
