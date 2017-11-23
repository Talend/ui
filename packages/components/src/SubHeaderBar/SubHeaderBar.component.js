import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';

function DetailsTitle({ title, subTitle, iconFile, onClickEdit }) {
	return (
		<div className={theme['tc-subheader-bar-details']}>
			<span className={theme['tc-subheader-bar-icon-box']}>
				{iconFile && <Icon name={iconFile} className={theme['tc-subheader-bar-icon']} />}
			</span>
			<span className={theme['tc-subheader-bar-details-text']}>
				<span className={theme['tc-subheader-bar-details-title']}>{title}</span>
				<Icon
					name="talend-pencil"
					className={theme['tc-subheader-bar-details-pencil']}
					onClick={onClickEdit}
				/>
				{subTitle && <div className={theme['tc-subheader-bar-details-subtitle']}>{subTitle}</div>}
			</span>
		</div>
	);
}

DetailsTitle.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	iconFile: PropTypes.string,
	onClickEdit: PropTypes.func.isRequired,
};

function EditTitle({ title, iconFile, onClickValidate, onClickCancel }) {
	return (
		<div className={theme['tc-subheader-bar-form']}>
			{iconFile && (
				<span className={theme['tc-subheader-bar-icon-box']}>
					<Icon name={iconFile} className={theme['tc-subheader-bar-icon']} />
				</span>
			)}
			<form className={theme['tc-subheader-bar-form-box']}>
				<div className={classNames(theme['tc-subheader-bar-form-group'], 'form-group')}>
					<div className={classNames(theme['tc-subheader-bar-override-width'], 'col-lg-10')}>
						<input
							type="text"
							className={classNames(theme['tc-subheader-bar-input-field'], 'form-control')}
							id="inputTitle"
							placeholder={title}
						/>
					</div>
				</div>
			</form>
			<div className={theme['tc-subheader-bar-form-icon-box']}>
				{/* TODO MAKE ACTION COMPONENT */}
				<Icon
					className={theme['tc-subheader-bar-form-icon-validate']}
					name="talend-check"
					onClick={onClickValidate}
				/>
				{/* TODO MAKE ACTION COMPONENT */}
				<Icon
					className={theme['tc-subheader-bar-form-icon-cancel']}
					name="talend-cross"
					onClick={onClickCancel}
				/>
			</div>
		</div>
	);
}

EditTitle.propTypes = {
	title: PropTypes.string.isRequired,
	iconFile: PropTypes.string,
	onClickValidate: PropTypes.func.isRequired,
	onClickCancel: PropTypes.func.isRequired,
};

function Actions({ actions }, right, center) {
	if (actions && Array.isArray(actions)) {
		const actionsComponent = actions.map((action, index) => {
			if (action.tag === 'button') {
				return (
					<ActionBar.Content key={index} tag="button" center={center} right={right}>
						<Action key={index} {...action} />
					</ActionBar.Content>
				);
			}
			return (
				<ActionBar.Content key={index} tag={action.tag} center={center} right={right}>
					{action.component}
				</ActionBar.Content>
			);
		});
		return (
			<ActionBar className={theme['tc-subheader-bar-action-bar']}>{actionsComponent}</ActionBar>
		);
	}
	return null;
}

Actions.propTypes = {
	actions: PropTypes.array,
};

function SubHeaderBar({ backAction, actionsCenter, actionsRight, editMode, ...rest }) {
	return (
		<nav className={classNames(theme['tc-subheader-bar'])}>
			<span className={classNames(theme['tc-subheader-bar-back-button'])}>
				<ActionBar.Content tag="button" left>
					<Action {...backAction} hideLabel />
				</ActionBar.Content>
			</span>
			{editMode ? <EditTitle {...rest} /> : <DetailsTitle {...rest} />}
			{actionsCenter && <Actions actions={actionsCenter} center right={false} />}
			{actionsRight && <Actions actions={actionsRight} center={false} right />}
		</nav>
	);
}

SubHeaderBar.propTypes = {
	backAction: PropTypes.object,
	editMode: PropTypes.bool,
	actionsCenter: PropTypes.array,
	actionsRight: PropTypes.array,
};

SubHeaderBar.propTypes.default = {
	editMode: false,
};

export default SubHeaderBar;
