import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './InputTitleSubHeader.scss';
import { getDefaultTranslate } from '../../translate';
import Icon from '../../Icon';

function TitleSubHeader({ title, subTitle, onEdit, t }) {
	return (
		<div className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
			<div
				className={classNames(
					theme['tc-subheader-details-text-title'],
					'tc-subheader-details-text-title',
				)}
			>
				<h1
					className={classNames(
						theme['tc-subheader-details-text-title-wording'],
						'tc-subheader-details-text-title-wording',
					)}
				>
					{title}
				</h1>
				{onEdit && (
					<Action
						name="action-edit-title"
						label={t('MODIFY_TOOLTIP', { defaultValue: 'Modify' })}
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

TitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string,
	onEdit: PropTypes.func,
	t: PropTypes.func,
};

TitleSubHeader.defaultProps = {
	t: getDefaultTranslate,
};

class InlineFormSubHeader extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
		onChange: PropTypes.func,
		inputTextValue: PropTypes.string,
		t: PropTypes.func,
	};

	static defaultProps = {
		t: getDefaultTranslate,
	};

	constructor(props) {
		super(props);
		this.selectInput = this.selectInput.bind(this);
	}

	selectInput(input) {
		this.textInput = input;
		if (this.textInput) {
			this.textInput.select();
			this.textInput.focus();
		}
	}

	render() {
		const { title, inputTextValue, onSubmit, onCancel, onChange, t } = this.props;
		return (
			<form className={classNames(theme['tc-subheader-details-form'], 'tc-subheader-details-form')}>
				<input
					ref={this.selectInput}
					id="inputTitle"
					type="text"
					className={classNames(
						theme['tc-subheader-details-form-input'],
						'tc-subheader-details-form-input',
						'form-control',
					)}
					onChange={onChange}
					value={inputTextValue || title}
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
}

function InputTitleSubHeader({ title, iconFile, editMode, ...rest }) {
	return (
		<div className={classNames(theme['tc-subheader-details'], 'tc-subheader-details')}>
			{iconFile && (
				<Icon
					name={iconFile}
					className={classNames(theme['tc-subheader-details-icon'], 'tc-subheader-details-icon')}
				/>
			)}
			{editMode ? (
				<InlineFormSubHeader title={title} {...rest} />
			) : (
				<TitleSubHeader title={title} {...rest} />
			)}
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

export { InputTitleSubHeader as default, InlineFormSubHeader, TitleSubHeader };
