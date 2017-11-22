import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';

class SubHeaderBar extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequied,
		onClickValidate: PropTypes.func.isRequired,
		subTitle: PropTypes.string,
		iconFile: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onClickCancel = this.onClickCancel.bind(this);
		this.getDetails = this.getDetails.bind(this);
		this.getEditTitle = this.getEditTitle.bind(this);
		this.state = {
			editMode: false,
		};
	}

	onClickEdit() {
		this.setState({ editMode: !this.state.editMode });
	}

	onClickCancel() {
		this.setState({ editMode: false });
	}

	getDetails() {
		const { title, subTitle, iconFile } = this.props;
		return (
			<div className={theme['tc-subheader-bar-details']}>
				{iconFile && <Icon name={iconFile} className={theme['tc-subheader-bar-details-icon']} />}
				<p className={theme['tc-subheader-bar-details-text']}>
					{title && (
						<span>
							<span className={theme['tc-subheader-bar-details-title']}>{title}</span>
							<Icon
								name="talend-pencil"
								className={theme['tc-subheader-bar-details-pencil']}
								onClick={this.onClickEdit}
							/>
						</span>
					)}
					{subTitle && <div className={theme['tc-subheader-bar-details-subtitle']}>{subTitle}</div>}
				</p>
			</div>
		);
	}

	getEditTitle() {
		const { title, iconFile, onClickValidate } = this.props;
		return (
			<div className={theme['tc-subheader-bar-form']}>
				{iconFile && (
					<Icon name={iconFile} className={theme['tc-subheader-bar-form-details-icon']} />
				)}
				<form>
					<div className={classNames(theme['tc-subheader-bar-form-group'], 'form-group')}>
						<div className="col-lg-10">
							<input type="text" className="form-control" id="inputTitle" placeholder={title} />
						</div>
					</div>
				</form>
				<Icon
					className={theme['tc-subheader-bar-form-icon-validate']}
					name="talend-check"
					onClick={onClickValidate}
				/>
				<Icon
					className={theme['tc-subheader-bar-form-icon-cancel']}
					name="talend-cross"
					onClick={this.onClickCancel}
				/>
			</div>
		);
	}

	render() {
		return (
			<nav className={classNames(theme['tc-subheader-bar'])}>
				<span className={classNames(theme['tc-subheader-bar-back-button'])}>
					<ActionBar.Content tag="button" left>
						<Action {...this.props.returnAction} hideLabel />
					</ActionBar.Content>
				</span>
				{this.state.editMode ? this.getEditTitle() : this.getDetails()}
				{this.props.rightActions && <ActionBar selected={0} actions={this.props.rightActions} />}
			</nav>
		);
	}
}

export default SubHeaderBar;

// <ActionBar.Content tag="button" right>
// 	<Action className={theme['tc-subheader-bar-button-overlay']} icon="talend-bubbles" onClick={() => console.log('return bubbles')} />
// 	<Action className={theme['tc-subheader-bar-button-overlay']} icon="talend-activity" onClick={() => console.log('return activity')} />
// 	<Action className={theme['tc-subheader-bar-button-overlay']} icon="talend-bell" onClick={() => console.log('return bell')} />
// 	<Action className={theme['tc-subheader-bar-button-overlay']} icon="talend-check" onClick={() => console.log('return check')} />
// </ActionBar.Content>
