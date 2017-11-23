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
				<Icon
					className={theme['tc-subheader-bar-form-icon-validate']}
					name="talend-check"
					onClick={onClickValidate}
				/>
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

function ActionsRight({ actionsContentRight }) {
	if (actionsContentRight && Array.isArray(actionsContentRight)) {
		const actions = actionsContentRight.map((action, index) => {
			if (action.tag === 'button') {
				return (
					<ActionBar.Content key={index} tag="button" right>
						<Action key={index} {...action} />
					</ActionBar.Content>
				);
			}
			return (
				<ActionBar.Content key={index} tag={action.tag} right>
					{action.component(action.componentProps)}
				</ActionBar.Content>
			);
		});
		return <ActionBar className={theme['tc-subheader-bar-action-bar']}>{actions}</ActionBar>;
	}
	return null;
}

ActionsRight.propTypes = {
	actionsContentRight: PropTypes.array,
};

function SubHeaderBar({ backAction, editMode, ...rest }) {
	return (
		<nav className={classNames(theme['tc-subheader-bar'])}>
			<span className={classNames(theme['tc-subheader-bar-back-button'])}>
				<ActionBar.Content tag="button" left>
					<Action {...backAction} hideLabel />
				</ActionBar.Content>
			</span>
			{editMode ? <EditTitle {...rest} /> : <DetailsTitle {...rest} />}
			<ActionsRight {...rest} />
		</nav>
	);
}

SubHeaderBar.propTypes = {
	backAction: PropTypes.object,
	editMode: PropTypes.bool,
};

SubHeaderBar.propTypes.default = {
	editMode: false,
};

export default SubHeaderBar;
