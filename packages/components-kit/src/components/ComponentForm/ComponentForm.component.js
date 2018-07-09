import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { UIForm } from '@talend/react-forms/lib/UIForm';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { CircularProgress } from '@talend/react-components';
import memoizeOne from 'memoize-one';
import kit from 'component-kit.js';

export const DEFAULT_STATE = new Map({
	dirty: false,
});

function toJS(immutableObject) {
	if (!immutableObject) {
		return null;
	}
	return immutableObject.toJS();
}

export class TCompForm extends React.Component {
	static displayName = 'ComponentForm';
	static propTypes = {
		...cmfConnect.propTypes,
	};
	static defaultProps = {
		customTriggers: () => {},
	};

	static ON_CHANGE = 'TCOMP_FORM_CHANGE';
	static ON_TRIGGER = 'TCOMP_FORM_TRIGGER';
	static ON_SUBMIT = 'TCOMP_FORM_SUBMIT';
	static ON_DEFINITION_URL_CHANGED = 'TCOMP_FORM_DEFINITION_URL_CHANGE';

	constructor(props) {
		super(props);
		this.state = {};
		this.onTrigger = this.onTrigger.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.getUISpec = this.getUISpec.bind(this);
		this.setupTrigger = this.setupTrigger.bind(this);
		this.getTriggers = this.getTriggers.bind(this);
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
			this.trigger = this.setupTrigger(this.props);
		}
		if (this.props.definitionURL !== props.definitionURL) {
			this.props.dispatch({
				type: TCompForm.ON_DEFINITION_URL_CHANGED,
				...this.props,
			});
		}
	}

	onChange(event, data) {
		event.persist();
		if (!this.props.state.get('dirty')) {
			this.props.setState({ dirty: true });
		}
		const properties = data.properties;
		if (data.schema.titleMap && data.value) {
			// Here we add a field side by side with the value
			// to keep the title associated to the value
			const info = data.schema.titleMap.find(titleMap => titleMap.value === data.value);
			let currentProp = properties;
			let nameKey;
			data.schema.key.forEach((key, index) => {
				if (index !== data.schema.key.length - 1) {
					currentProp = currentProp[key];
				} else {
					nameKey = `$${key}_name`;
				}
			});

			if (info) {
				currentProp[nameKey] = info.name;
			} else {
				delete currentProp[nameKey];
			}
		}
		this.setState({ properties });
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
				data,
				properties,
				uiSpec: this.getUISpec(),
			});
		}
	}

	onTrigger(event, payload) {
		return this.trigger(event, payload).then(data => {
			if (data.properties) {
				this.setState({ properties: data.properties });
			}
			if (data.errors || data.jsonSchema || data.uiSchema) {
				this.props.setState(data);
			}
			this.props.dispatch({
				type: TCompForm.ON_TRIGGER,
				event: {
					type: 'onTrigger',
					component: TCompForm,
					componentId: this.props.componentId,
					props: this.props,
					state: this.state,
				},
				data,
				uiSpec: this.getUISpec(),
			});
		});
	}

	onSubmit(event, data) {
		event.persist();
		if (this.props.onSubmit) {
			this.props.onSubmit(event, data);
		}
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
			customRegistry: this.getTriggers(),
		});
	}

	getTriggers() {
		return {
			reloadForm: ({ body }) => ({
				...body,
				properties: { _datasetMetadata: this.state.properties._datasetMetadata },
			}),
		};
	}

	getUISpec() {
		return {
			properties: this.state.properties,
			jsonSchema: this.getMemoizedJsonSchema(this.props.state.get('jsonSchema')),
			uiSchema: this.getMemoizedJsonSchema(this.props.state.get('uiSchema')),
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

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'ComponentForm#default',
	},
})(TCompForm);
