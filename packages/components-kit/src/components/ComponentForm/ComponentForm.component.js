import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { UIForm } from '@talend/react-forms/lib/UIForm';
import { getValue } from '@talend/react-forms/lib/UIForm/utils/properties';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { CircularProgress } from '@talend/react-components';
import memoizeOne from 'memoize-one';
import kit from 'component-kit.js';

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

/**
 * Reset the form data
 * - keep the metadata properties
 * - remove the runtime properties
 * @param {object} body The new uiSpec
 * @param {object} properties All properties at trigger time
 * @returns {object} The uiSpec with only the metadata properties
 */
export function keepOnlyDatasetMetadataProperties({ body, properties }) {
	return {
		...body,
		// eslint-disable-next-line no-underscore-dangle
		properties: { _datasetMetadata: properties._datasetMetadata },
	};
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

	componentDidUpdate(props) {
		if (
			props.triggerURL !== this.props.triggerURL ||
			props.customTriggers !== this.props.customTriggers
		) {
			this.setupTrigger(this.props);
		}
		if (this.props.definitionURL !== props.definitionURL) {
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
				event: {
					type: 'onChange',
					component: 'TCompForm',
					props: this.props,
					state: this.state,
					source: event,
				},
				data: payload,
				properties: payload.properties,
				uiSpec: this.getUISpec(),
			});
		}
	}

	onTrigger(event, payload) {
		resolveNameForTitleMap(payload);
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
		});
	}

	onSubmit(event, data) {
		event.persist();
		this.props.dispatch({
			type: TCompForm.ON_SUBMIT,
			event,
			...this.getUISpec(),
			properties: data,
		});
	}

	setupTrigger(props) {
		this.trigger = kit.createTriggers({
			url: props.triggerURL,
			customRegistry: {
				...props.customTriggers,
				reloadForm: keepOnlyDatasetMetadataProperties,
			},
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
			return <CircularProgress />;
		}

		const props = {
			...omit(this.props, cmfConnect.INJECTED_PROPS),
			...uiSpecs,
			properties: this.state.properties,
			onTrigger: this.onTrigger,
			onChange: this.onChange,
			onSubmit: this.onSubmit,
		};

		const errors = this.props.state.get('errors');
		if (errors) {
			props.errors = this.getMemoizedErrors(errors);
		}

		return <UIForm {...props} />;
	}
}

TCompForm.ON_CHANGE = 'TCOMP_FORM_CHANGE';
TCompForm.ON_SUBMIT = 'TCOMP_FORM_SUBMIT';
TCompForm.ON_DEFINITION_URL_CHANGED = 'TCOMP_FORM_DEFINITION_URL_CHANGE';
TCompForm.displayName = 'ComponentForm';
TCompForm.propTypes = {
	...cmfConnect.propTypes,
};

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'ComponentForm#default',
	},
})(TCompForm);
