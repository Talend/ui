import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import ComponentForm from '@talend/react-forms';
import DefaultArrayFieldTemplate from '@talend/react-forms/lib/templates/ArrayFieldTemplate';
import classnames from 'classnames';

export const DEFAULT_STATE = new Immutable.Map({});

/**
 * Because we don't want to loose form input
 * This Component bind onChange to store the formData in it's state.
 * <Form jsonSchema={} uiSchema={} data={} />
 */
class Form extends React.Component {
	static displayName = 'Container(Form)';
	static propTypes = {
		formId: PropTypes.string.isRequired,
		...cmfConnect.propTypes,
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
		return state.cmf.components.getIn(['Container(Form)', formId, 'data'], new Immutable.Map());
	}

	constructor(props) {
		super(props);
		this.formActions = this.formActions.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onErrors = this.onErrors.bind(this);
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
		} else if (nextProps.properties !== this.props.properties) {
			this.props.setState({ data: nextProps.data });
		}
	}

	onChange(event, form) {
		this.props.setState({ data: form.formData, dirty: true });
		if (this.props.onChange) {
			this.props.onChange(form);
		}
	}

	onErrors(event, errors) {
		this.props.setState({ errors });
		if (this.props.onErrors) {
			this.props.onErrors(event, errors);
		}
	}

	onSubmit(event, formData) {
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

	errors() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		if (typeof this.props.errors === 'function') {
			return this.props.errors(state.errors);
		}
		return Object.assign({}, this.props.errors, state.errors);
	}

	formActions() {
		if (typeof this.props.actions === 'function') {
			const state = (this.props.state || DEFAULT_STATE).toJS();
			return this.props.actions(state.data || this.props.data);
		}
		return this.props.actions;
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const props = {
			data: {
				jsonSchema: this.jsonSchema(),
				uiSchema: this.uiSchema(),
				properties: this.data(),
				errors: this.errors(),
			},
			className: classnames('tc-form', 'rjsf', this.props.className, {
				dirty: state.dirty,
				pristine: !state.dirty,
			}),
			ArrayFieldTemplate: this.props.ArrayFieldTemplate || DefaultArrayFieldTemplate,
			actions: this.formActions(),
			fields: this.props.fields,
			onChange: this.onChange,
			onTrigger: this.props.onTrigger,
			onSubmit: this.onSubmit,
			onErrors: this.onErrors,
			customFormats: this.props.customFormats,
			customValidation: this.props.customValidation,
			buttonBlockClass: this.props.buttonBlockClass,
			children: this.props.children,
			uiform: this.props.uiform,
			language: this.props.language,
			widgets: this.props.widgets,
			getComponent: this.props.getComponent,
			loading: this.props.loading,
			...this.props.formProps,
		};
		return <ComponentForm {...props}>{this.props.children}</ComponentForm>;
	}
}
Form.defaultProps = {
	data: {},
};

export default Form;
