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

	static TCOMP_FORM_ON_CHANGE = 'TCOMP_FORM_ON_CHANGE';
	static TCOMP_FORM_ON_TRIGGER = 'TCOMP_FORM_ON_TRIGGER';
	static DEFINITION_URL_CHANGED = 'TCOMP_DEFINITION_URL_CHANGED';

	constructor(props) {
		super(props);
		this.state = {};
		this.onTrigger = this.onTrigger.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getUISpec = this.getUISpec.bind(this);
		this.setupTrigger = this.setupTrigger.bind(this);
		this.setupTrigger(props);
	}

	componentDidUpdate(props) {
		if (
			(props.triggerURL !== this.props.triggerURL) ||
			(props.customTriggers !== this.props.customTriggers)
		) {
			this.trigger = this.setupTrigger(this.props);
		}
		if (this.props.definitionURL !== props.definitionURL) {
			this.props.dispatch({
				type: ComponentForm.DEFINITION_URL_CHANGED,
				...this.props,
			});
		}
	}

	onChange(event, data) {
		this.setState({ properties: data.properties });
		this.props.dispatch({
			type: ComponentForm.TCOMP_FORM_ON_CHANGE,
			event: {
				type: 'onChange',
				component: 'TCompForm',
				props: this.props,
				state: this.state,
				source: event,
			},
			data,
			uiSpec: this.getUISpec(),
		});
	}

	onTrigger(event, payload) {
		this.trigger(event, payload).then(data => {
			if (data.properties) {
				this.setState({ properties: data.properties });
			}
			if (data.errors) {
				this.props.setState({ errors: data.errors });
			}
			if (data.jsonSchema || data.uiSchema) {
				this.props.setState(data);
			}
			this.props.dispatch({
				type: ComponentForm.TCOMP_FORM_ON_TRIGGER,
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

	setupTrigger(props) {
		this.trigger = kit.createTriggers({
			url: props.triggerURL,
			customRegistry: props.customTriggers(this),
		});
	}

	getUISpec() {
		const spec = { properties: this.state.properties };
		let immutableSpec = this.props.state;
		if (this.props.uiSpecPath) {
			immutableSpec = immutableSpec.getIn(this.props.uiSpecPath.split('.'), new Map());
		}
		const jsonSchema = immutableSpec.get('jsonSchema');
		const uiSchema = immutableSpec.get('uiSchema');
		if (jsonSchema) {
			spec.jsonSchema = jsonSchema.toJS();
		}
		if (uiSchema) {
			spec.uiSchema = uiSchema.toJS();
		}
		return spec;
	}

	render() {
		const props = Object.assign(
			{},
			omit(this.props, cmfConnect.INJECTED_PROPS),
			this.getUISpec(),
			{
				onTrigger: this.onTrigger,
				onChange: this.onChange,
			},
		);
		const response = this.props.state.get('response');
		if (!props.jsonSchema) {
			if (response) {
				return <p className="danger">{response.get('statusText')}</p>
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
