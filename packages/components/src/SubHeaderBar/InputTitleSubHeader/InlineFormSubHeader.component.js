import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './InputTitleSubHeader.scss';
import { getDefaultTranslate } from '../../translate';

function noop() {}

class InlineFormSubHeader extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
		onCancel: PropTypes.func,
		onChange: PropTypes.func,
		t: PropTypes.func,
	};

	static defaultProps = {
		t: getDefaultTranslate,
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.selectInput = this.selectInput.bind(this);
		this.state = {
			value: props.title,
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

	onSubmit(event) {
		event.preventDefault();
		if (this.state.value.trim().length !== 0) {
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
		const notFilled = this.state.value.trim().length === 0;
		const t = this.props.t;
		return (
			<form
				onSubmit={this.onSubmit}
				className={classNames(theme['tc-subheader-details-form'], 'tc-subheader-details-form')}
			>
				<div className={classNames('form-group', { 'has-error': notFilled })}>
					<label className="sr-only" htmlFor="inputTitle">
						{t('SUBHEADERBAR_INPUT_TITLE_FORM_LABEL', { defaultvalue: 'title' })}
					</label>
					<input
						ref={this.selectInput}
						id="inputTitle"
						type="text"
						className={classNames(
							theme['tc-subheader-details-form-input'],
							'tc-subheader-details-form-input',
							'form-control',
						)}
						onChange={this.onChange}
						value={this.state.value}
					/>
				</div>
				<div
					className={classNames(
						theme['tc-subheader-details-form-buttons'],
						'tc-subheader-details-form-buttons',
					)}
				>
					<Action
						type="submit"
						name="action-submit-title"
						label={this.props.t('SUBMIT_TOOLTIP', { defaultValue: 'Submit' })}
						icon="talend-check"
						onClick={noop}
						bsStyle="link"
						className={classNames(
							theme['tc-subheader-details-form-buttons-icon'],
							'tc-subheader-details-form-buttons-icon',
						)}
						disabled={notFilled}
						hideLabel
					/>
					<Action
						name="action-cancel-title"
						label={this.props.t('CANCEL_TOOLTIP', { defaultValue: 'Cancel' })}
						icon="talend-cross"
						onClick={this.onCancel}
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

export default InlineFormSubHeader;
