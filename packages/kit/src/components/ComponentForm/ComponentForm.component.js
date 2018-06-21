import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import { UIForm } from '@talend/react-forms/lib/UIForm';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { CircularProgress } from '@talend/react-components';
import kit from 'component-kit.js';

export const DEFAULT_STATE = new Map({
	dirty: false,
});

class ComponentForm extends React.Component {
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
				type: ComponentForm.ON_DEFINITION_URL_CHANGED,
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
			let currentKey;
			data.schema.key.forEach((key, index) => {
				if (index !== data.schema.key.length - 1) {
					currentProp = currentProp[key];
				} else {
					currentKey = key;
				}
			});
			currentProp[`$${currentKey}_name`] = info.name;
		}
		this.setState({ properties });
		if (this.props.dispatchOnChange) {
			this.props.dispatch({
				type: ComponentForm.ON_CHANGE,
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
		this.trigger(event, payload).then(data => {
			if (data.properties) {
				this.setState({ properties: data.properties });
			}
			if (data.errors || data.jsonSchema || data.uiSchema) {
				this.props.setState(data);
			}
			this.props.dispatch({
				type: ComponentForm.ON_TRIGGER,
				event: {
					type: 'onTrigger',
					component: ComponentForm,
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
			type: ComponentForm.ON_SUBMIT,
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
		const spec = { properties: this.state.properties };
		const jsonSchema = this.props.state.get('jsonSchema');
		const uiSchema = this.props.state.get('uiSchema');
		if (jsonSchema) {
			spec.jsonSchema = jsonSchema.toJS();
		}
		if (uiSchema) {
			spec.uiSchema = uiSchema.toJS();
		}
		return spec;
	}

	render() {
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), this.getUISpec(), {
			onTrigger: this.onTrigger,
			onChange: this.onChange,
			onSubmit: this.onSubmit,
		});
		const response = this.props.state.get('response');
		if (!props.jsonSchema) {
			if (response) {
				return <p className="danger">{response.get('statusText')}</p>;
			}
			return <CircularProgress />;
		}
		if (this.state.properties) {
			props.properties = this.state.properties;
		}
		if (this.props.state.get('errors')) {
			props.errors = this.props.state.get('errors').toJS();
		}
		return <UIForm {...props} />;
	}
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'ComponentForm#default',
	},
})(ComponentForm);
