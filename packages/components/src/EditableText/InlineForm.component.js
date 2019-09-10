import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import { Action } from '../Actions';
import FocusManager from '../FocusManager';
import theme from './EditableText.scss';
import getDefaultT from '../translate';

class InlineForm extends React.Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		errorMessage: PropTypes.string,
		feature: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
		onCancel: PropTypes.func,
		onChange: PropTypes.func,
		t: PropTypes.func,
		required: PropTypes.bool,
	};

	static defaultProps = {
		t: getDefaultT(),
		required: true,
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.selectInput = this.selectInput.bind(this);
		this.state = {
			value: props.text,
		};
	}

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(event);
		}
		this.setState({ value: event.target.value });
	}

	onCancel(event) {
		if (this.props.onCancel) {
			this.props.onCancel(event);
		}
		this.setState({ value: '' });
	}

	onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				this.onCancel(event);
				break;
			default:
				break;
		}
	}

	onSubmit(event) {
		event.preventDefault();
		if (this.state.value.trim().length !== 0 || !this.props.required) {
			this.props.onSubmit(event, { value: this.state.value, props: this.props });
		}
	}

	selectInput(input) {
		this.inputText = input;
		if (this.inputText) {
			this.inputText.select();
			this.inputText.focus();
		}
	}

	render() {
		const { feature, t, placeholder, required, errorMessage } = this.props;
		const notFilled = required && this.state.value.trim().length === 0;
		const notValid = notFilled || !!errorMessage;
		return (
			<FocusManager onFocusOut={this.onSubmit}>
				<form
					onSubmit={this.onSubmit}
					className={classNames(theme['tc-editable-text-form'], 'tc-editable-text-form')}
				>
					<div className={classNames('form-group', { 'has-error': notValid })}>
						<input
							ref={this.selectInput}
							id="inputTitle"
							type="text"
							placeholder={placeholder}
							className={classNames(
								theme['tc-editable-text-form-input'],
								'tc-editable-text-form-input',
								'form-control',
							)}
							onChange={this.onChange}
							value={this.state.value}
							onKeyDown={this.onKeyDown}
						/>
						{errorMessage && <p className="help-block text-danger">{errorMessage}</p>}
					</div>
					<div
						className={classNames(
							theme['tc-editable-text-form-buttons'],
							'tc-editable-text-form-buttons',
						)}
					>
						<Action
							name="action-cancel-title"
							label={t('CANCEL_TOOLTIP', { defaultValue: 'Cancel' })}
							icon="talend-cross"
							onClick={this.onCancel}
							bsStyle="link"
							className={classNames(
								theme['tc-editable-text-form-buttons-icon'],
								'tc-editable-text-form-buttons-icon',
								theme['tc-editable-text-form-buttons-cancel'],
								'tc-editable-text-form-buttons-cancel',
							)}
							hideLabel
							data-feature={feature && `${feature}.cancel`}
						/>
						<Action
							type="submit"
							name="action-submit-title"
							label={t('SUBMIT_TOOLTIP', { defaultValue: 'Submit' })}
							icon="talend-check"
							bsStyle="link"
							className={classNames(
								theme['tc-editable-text-form-buttons-icon'],
								'tc-editable-text-form-buttons-icon',
								theme['tc-editable-text-form-buttons-submit'],
								'tc-editable-text-form-buttons-submit',
							)}
							disabled={notFilled}
							hideLabel
							data-feature={feature && `${feature}.submit`}
						/>
					</div>
				</form>
			</FocusManager>
		);
	}
}

export default InlineForm;
