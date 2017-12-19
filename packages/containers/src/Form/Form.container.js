import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { componentState } from '@talend/react-cmf';
import ComponentForm from '@talend/react-forms';
import ArrayFieldTemplate from '@talend/react-forms/lib/templates/ArrayFieldTemplate';
import classnames from 'classnames';

export const DEFAULT_STATE = new Immutable.Map({
	errors: new Immutable.Map(),
});

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
		return state.cmf.components.getIn(['Container(Form)', formId, 'data'], new Immutable.Map());
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
		this.setErrors = this.setErrors.bind(this);
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

	setErrors(formName, errors) {
		this.props.setState({ errors });
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const props = {
			data: {
				jsonSchema: this.jsonSchema(),
				uiSchema: this.uiSchema(),
				properties: this.data(),
			},
			className: classnames('tc-form', 'rjsf', this.props.className, {
				dirty: state.dirty,
				pristine: !state.dirty,
			}),
			ArrayFieldTemplate,
			actions: this.formActions(),
			fields: this.props.fields,
			onChange: this.onChange,
			onSubmit: this.onSubmit,
			buttonBlockClass: this.props.buttonBlockClass,
			children: this.props.children,
			...this.props.formProps,
		};
		if (this.props.uiform) {
			props.uiform = true;
			props.onTrigger = this.onTrigger;
			props.setErrors = this.setErrors;
			props.errors = state.errors;
		}
		return <ComponentForm {...props} />;
	}
}
Form.defaultProps = {
	data: {},
};

export default Form;
