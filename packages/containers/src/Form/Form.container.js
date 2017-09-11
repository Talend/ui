import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { componentState } from '@talend/react-cmf';
import ComponentForm from '@talend/react-forms';
import ArrayFieldTemplate from '@talend/react-forms/lib/templates/ArrayFieldTemplate';
import classnames from 'classnames';

export const DEFAULT_STATE = new Map({});

/**
 * Because we don't want to loose form input
 * This Component bind onChange to store the formData in it's state.
 * <Form jsonSchema={} uiSchema={} data={} />
 */
class Form extends React.Component {
	static displayName = 'Container(Form)';
	static propTypes = {
		formId: PropTypes.string.isRequired,
		...componentState.propTypes,
	};

	/**
	 * return the form data in redux state
	 * usefull in mapStateToProps of your component
	 * @example
	const FORM_ID = 'add-datastore-form';

	 *
	 * @param  {[type]} state  [description]
	 * @param  {[type]} formId [description]
	 * @return {[type]}        [description]
	 */
	static getFormData(state, formId) {
		return state.cmf.components.getIn(['Container(Form)', formId, 'data'], Map());
	}

	constructor(props) {
		super(props);
		this.formActions = this.formActions.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.jsonSchema = this.jsonSchema.bind(this);
		this.uiSchema = this.uiSchema.bind(this);
		this.data = this.data.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.formId !== this.props.formId) {
			if (this.props.state) {
				this.props.deleteState();
			}
			if (!nextProps.state) {
				nextProps.initState();
			}
		}
	}

	onTrigger(formData, formId, propertyName, propertyValue) {
		if (this.props.onTrigger) {
			this.props.onTrigger(formData, formId, propertyName, propertyValue);
		}
	}

	onChange(form) {
		this.props.setState({ data: form.formData, dirty: true });
		if (this.props.onChange) {
			this.props.onChange(form);
		}
	}

	onSubmit(formData) {
		if (this.props.onSubmit) {
			this.props.onSubmit(formData);
		}
		if (this.props.onSubmitActionCreator) {
			this.props.dispatchActionCreator(this.props.onSubmitActionCreator, null, {
				props: this.props,
				formData,
			});
		}
	}

	formActions() {
		if (typeof this.props.actions === 'function') {
			const state = (this.props.state || DEFAULT_STATE).toJS();
			return this.props.actions(state.data || this.props.data);
		}
		return this.props.actions;
	}

	jsonSchema() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		if (typeof this.props.jsonSchema === 'function') {
			return this.props.jsonSchema(state.data);
		}
		return this.props.jsonSchema;
	}

	uiSchema() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		if (typeof this.props.uiSchema === 'function') {
			return this.props.uiSchema(state.data);
		}
		return this.props.uiSchema;
	}

	data() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		if (typeof this.props.data === 'function') {
			return this.props.data(state.data);
		}
		return Object.assign({}, this.props.data, state.data);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const data = {
			jsonSchema: this.jsonSchema(),
			uiSchema: this.uiSchema(),
			properties: this.data(),
		};
		const className = classnames('tc-form', 'rjsf', this.props.className, {
			dirty: state.dirty,
			pristine: !state.dirty,
		});
		return (
			<ComponentForm
				ArrayFieldTemplate={ArrayFieldTemplate}
				className={className}
				data={data}
				actions={this.formActions()}
				fields={this.props.fields}
				onTrigger={this.onTrigger}
				onChange={this.onChange}
				onSubmit={this.onSubmit}
				buttonBlockClass={this.props.buttonBlockClass}
				{...this.props.formProps}
			>
				{this.props.children}
			</ComponentForm>
		);
	}
}
Form.defaultProps = {
	data: {},
};

export default Form;
