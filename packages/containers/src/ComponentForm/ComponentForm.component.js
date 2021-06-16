import React from 'react';
import PropTypes from 'prop-types';
import cmf, { cmfConnect } from '@talend/react-cmf';
import Form from '@talend/react-forms';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { Map } from 'immutable';
import memoizeOne from 'memoize-one';
import kit from './kit';
import tcompFieldsWidgets from './fields';

const TO_OMIT = [
	'definitionURL',
	'uiSpecPath',
	'submitURL',
	'triggerULR',
	'lang',
	'customTriggers',
	'dispatchOnChange',
	...cmfConnect.INJECTED_PROPS,
];

export const DEFAULT_STATE = new Map({
	dirty: false,
	initialState: new Map(),
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
	if (!schema.titleMap) {
		return;
	}

	// Here we add a field side by side with the value
	// to keep the title associated to the value
	const valueIsArray = Array.isArray(value);
	const uniformValue = valueIsArray ? value : [value];

	const names = uniformValue
		.map(nextValue => schema.titleMap.find(titleMap => titleMap.value === nextValue))
		.map(entry => entry && entry.name);

	const parentKey = schema.key.slice();
	const key = parentKey.pop();
	const nameKey = `$${key}_name`;
	const parentValue = Form.UIForm.utils.properties.getValue(properties, { key: parentKey });

	if (names.some(name => name !== undefined)) {
		parentValue[nameKey] = valueIsArray ? names : names[0];
	} else {
		delete parentValue[nameKey];
	}
}

export class TCompForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onTrigger = this.onTrigger.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onReset = this.onReset.bind(this);
		this.getUISpec = this.getUISpec.bind(this);
		this.setupTrigger = this.setupTrigger.bind(this);
		this.setupTrigger(props);

		this.getMemoizedJsonSchema = memoizeOne(toJS);
		this.getMemoizedUiSchema = memoizeOne(toJS);
		this.getMemoizedInitialState = memoizeOne(toJS);
	}

	componentWillReceiveProps(nextProps) {
		const nextProperties = nextProps.state.get('properties', Map());

		if (this.props.state.get('properties') !== nextProperties) {
			this.setState({ properties: nextProperties.toJS() });
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
				properties: this.state.properties,
			});
		}
	}

	onChange(_, payload) {
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
				...payload,
			});
		}
	}

	onTrigger(event, payload) {
		this.props.dispatch({
			type: TCompForm.ON_TRIGGER_BEGIN,
			...payload,
		});
		// Trigger definitions from tacokit can precise the fields that are impacted by the trigger.
		// Those fields are the jsonSchema path.
		// trigger = { options: [{ path: 'user.firstname' }, { path: 'user.lastname' }] }
		if (Array.isArray(get(payload, 'trigger.options'))) {
			const updating = payload.trigger.options.map(op => op.path);
			this.setState({ updating });
		}
		return this.trigger(event, payload)
			.then(data => {
				this.props.dispatch({
					type: TCompForm.ON_TRIGGER_END,
					...payload,
				});
				if (data.jsonSchema || data.uiSchema) {
					this.props.setState(data);
				}
				return data;
			})
			.finally(() => {
				this.setState({ updating: [] });
			});
	}

	onSubmit(_, properties) {
		this.props.dispatch({
			type: TCompForm.ON_SUBMIT,
			component: TCompForm.displayName,
			componentId: this.props.componentId,
			properties,
		});
	}

	onReset() {
		this.props.setState(prev =>
			prev.state
				.set('jsonSchema', this.props.state.getIn(['initialState', 'jsonSchema']))
				.set('uiSchema', this.props.state.getIn(['initialState', 'uiSchema']))
				.set('properties', this.props.state.getIn(['initialState', 'properties']))
				.set('dirty', false),
		);
		this.setState({
			properties: this.props.state.getIn(['initialState', 'properties']).toJS(),
		});
	}

	setupTrigger(props) {
		const config = cmf.sagas.http.getDefaultConfig() || {};
		this.trigger = kit.createTriggers({
			url: props.triggerURL,
			customRegistry: props.customTriggers,
			headers: config.headers,
			lang: props.lang,
			security: {
				CSRFTokenCookieKey: props.CSRFTokenCookieKey,
				CSRFTokenHeaderKey: props.CSRFTokenHeaderKey,
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
			return <Form loading displayMode={this.props.displayMode} />;
		}

		const props = {
			...omit(this.props, TO_OMIT),
			data: uiSpecs,
			initialData: this.getMemoizedInitialState(this.props.state.get('initialState')),
			onTrigger: this.onTrigger,
			onChange: this.onChange,
			onSubmit: this.onSubmit,
			onReset: this.onReset,
			widgets: { ...tcompFieldsWidgets, ...this.props.widgets },
			updating: this.state.updating,
		};

		return <Form {...props} />;
	}
}

TCompForm.ON_CHANGE = 'TCOMP_FORM_CHANGE';
TCompForm.ON_SUBMIT = 'TCOMP_FORM_SUBMIT';
TCompForm.ON_SUBMIT_SUCCEED = 'TCOMP_FORM_SUBMIT_SUCCEED';
TCompForm.ON_SUBMIT_FAILED = 'TCOMP_FORM_SUBMIT_FAILED';
TCompForm.ON_TRIGGER_BEGIN = 'TCOMP_FORM_TRIGGER_BEGIN';
TCompForm.ON_TRIGGER_END = 'TCOMP_FORM_TRIGGER_END';
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
	dispatchOnChange: PropTypes.bool,
	CSRFTokenCookieKey: PropTypes.string,
	CSRFTokenHeaderKey: PropTypes.string,
};

export default cmfConnect({
	defaultState: DEFAULT_STATE,

	defaultProps: {
		saga: 'ComponentForm#default',
	},

	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(TCompForm);
