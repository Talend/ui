import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';

function DetailsTitle({ title, subTitle, iconFile, onEdit }) {
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
					onClick={onEdit}
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
	onEdit: PropTypes.func.isRequired,
};

function EditTitle({ title, iconFile, inputTextValue, onSubmit, onCancel, onChange }) {
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
							onChange={onChange}
							value={inputTextValue}
						/>
					</div>
				</div>
			</form>
			<div className={theme['tc-subheader-bar-form-icon-box']}>
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

function SubHeaderBarActions({ actions, right, center }) {
	if (actions && Array.isArray(actions)) {
		const actionsComponent = actions.map((action, index) => {
			if (action.tag === 'button') {
				return (
					<ActionBar.Content key={index} tag="button" center={center} right={right}>
						<Action {...action} />
					</ActionBar.Content>
				);
			}
			return (
				<ActionBar.Content key={index} tag={action.tag} center={center} right={right}>
					{action.component}
				</ActionBar.Content>
			);
		});
		return <div className={theme['tc-subheader-bar-action-bar']}>{actionsComponent}</div>;
	}
	return null;
}

SubHeaderBarActions.propTypes = {
	actions: PropTypes.array,
	right: PropTypes.bool,
	center: PropTypes.bool,
};

function SubHeaderBar({ onClickBackArrow, actionsCenter, actionsRight, editMode, ...rest }) {
	return (
		<nav className={classNames(theme['tc-subheader-bar'])}>
			<span className={theme['tc-subheader-bar-back-button']}>
				<ActionBar.Content left>
					<Action
						id="backArrow"
						onClick={onClickBackArrow}
						label="backArrow"
						icon="talend-arrow-left"
						className="tc-subheader-bar-back-icon"
						bsStyle="link"
						hideLabel
					/>
				</ActionBar.Content>
			</span>
			{editMode ? <EditTitle {...rest} /> : <DetailsTitle {...rest} />}
			{actionsCenter && <SubHeaderBarActions actions={actionsCenter} center right={false} />}
			{actionsRight && <SubHeaderBarActions actions={actionsRight} center={false} right />}
		</nav>
	);
}

SubHeaderBar.propTypes = {
	onClickBackArrow: PropTypes.func.isRequired,
	editMode: PropTypes.bool,
	actionsCenter: PropTypes.array,
	actionsRight: PropTypes.array,
};

SubHeaderBar.defaultProps = {
	editMode: true,
};

export default SubHeaderBar;
