import React from 'react';
import PropTypes from 'prop-types';
import cmf, { cmfConnect } from '@talend/react-cmf';
import Form from '@talend/react-forms';
import { getValue } from '@talend/react-forms/lib/UIForm/utils/properties';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import memoizeOne from 'memoize-one';
import kit from './kit';
import tcompFieldsWidgets from './fields';

export const DEFAULT_STATE = new Map({
	dirty: false,
});

/**
 * Convert immutable object to js object
 */
export function toJS(immutableObject) {
	if (!immutableObject) {
		return null;
	}
	return immutableObject.toJS();
}

/**
 * Insert titleMap name for corresponding value
 * Its key is prefixed by '$', this means that it's an internal property
 * @param schema The schema of the trigger input
 * @param properties All the form properties
 * @param value The input value
 */
export function resolveNameForTitleMap({ schema, properties, value }) {
	if (schema.titleMap) {
		// Here we add a field side by side with the value
		// to keep the title associated to the value
		const info = schema.titleMap.find(titleMap => titleMap.value === value);

		const parentKey = schema.key.slice();
		const key = parentKey.pop();
		const nameKey = `$${key}_name`;
		const parentValue = getValue(properties, { key: parentKey });

		if (info) {
			parentValue[nameKey] = info.name;
		} else {
			delete parentValue[nameKey];
		}
	}
}

export class TCompForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onTrigger = this.onTrigger.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getUISpec = this.getUISpec.bind(this);
		this.setupTrigger = this.setupTrigger.bind(this);
		this.setupTrigger(props);

		this.getMemoizedJsonSchema = memoizeOne(toJS);
		this.getMemoizedUiSchema = memoizeOne(toJS);
		this.getMemoizedErrors = memoizeOne(toJS);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.state.get('properties') !== nextProps.state.get('properties')) {
			this.setState({ properties: nextProps.state.get('properties').toJS() });
		}
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.triggerURL !== this.props.triggerURL ||
			prevProps.customTriggers !== this.props.customTriggers
		) {
			this.setupTrigger(this.props);
		}
		if (this.props.definitionURL !== prevProps.definitionURL) {
			this.props.dispatch({
				type: TCompForm.ON_DEFINITION_URL_CHANGED,
				...this.props,
			});
		}
	}

	onChange(event, payload) {
		event.persist();
		if (!this.props.state.get('dirty')) {
			this.props.setState({ dirty: true });
		}

		resolveNameForTitleMap(payload);
		this.setState({ properties: payload.properties });

		if (this.props.dispatchOnChange) {
			this.props.dispatch({
				type: TCompForm.ON_CHANGE,
				component: TCompForm.displayName,
				componentId: this.props.componentId,
				event,
				...payload,
			});
		}
	}

	onTrigger(event, payload) {
		return this.trigger(event, payload).then(data => {
			// Today there is a need to give control to the trigger to modify the properties
			// But this will override what user change in the meantime
			// need to rethink that, there are lots of potential issues :
			// - race conditions,
			// - trigger result that is does not fit user entry anymore,
			// - ...
			if (data.properties) {
				this.setState({ properties: data.properties });
			}
			if (data.errors || data.jsonSchema || data.uiSchema) {
				this.props.setState(data);
			}
			return data;
		});
	}

	onSubmit(event, properties) {
		event.persist();
		this.props.dispatch({
			type: TCompForm.ON_SUBMIT,
			component: TCompForm.displayName,
			componentId: this.props.componentId,
			event,
			properties,
		});
	}

	setupTrigger(props) {
		const config = cmf.sagas.http.getDefaultConfig() || {};
		this.trigger = kit.createTriggers({
			url: props.triggerURL,
			customRegistry: props.customTriggers,
			headers: config.headers,
			lang: props.lang,
		});
	}

	getUISpec() {
		return {
			properties: this.state.properties,
			jsonSchema: this.getMemoizedJsonSchema(this.props.state.get('jsonSchema')),
			uiSchema: this.getMemoizedUiSchema(this.props.state.get('uiSchema')),
		};
	}

	render() {
		const uiSpecs = this.getUISpec();

		if (!uiSpecs.jsonSchema) {
			const response = this.props.state.get('response');
			if (response) {
				return <p className="danger">{response.get('statusText')}</p>;
			}
			return <Form loading />;
		}

		const props = {
			...omit(this.props, cmfConnect.INJECTED_PROPS),
			...uiSpecs,
			properties: this.state.properties,
			onTrigger: this.onTrigger,
			onChange: this.onChange,
			onSubmit: this.onSubmit,
			widgets: { ...this.props.widgets, ...tcompFieldsWidgets },
		};

		const errors = this.props.state.get('errors');
		if (errors) {
			props.errors = this.getMemoizedErrors(errors);
		}

		return <Form {...props} uiform />;
	}
}

TCompForm.ON_CHANGE = 'TCOMP_FORM_CHANGE';
TCompForm.ON_SUBMIT = 'TCOMP_FORM_SUBMIT';
TCompForm.ON_SUBMIT_SUCCEED = 'TCOMP_FORM_SUBMIT_SUCCEED';
TCompForm.ON_DEFINITION_URL_CHANGED = 'TCOMP_FORM_DEFINITION_URL_CHANGE';
TCompForm.displayName = 'ComponentForm';
TCompForm.propTypes = {
	...cmfConnect.propTypes,
	definitionURL: PropTypes.string.isRequired,
	triggerURL: PropTypes.string.isRequired,
	submitURL: PropTypes.string,
	uiSpecPath: PropTypes.string,
	lang: PropTypes.string,
	customTriggers: PropTypes.object,
};

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'ComponentForm#default',
	},
})(TCompForm);
