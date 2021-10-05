import React from 'react';
import { cmfConnect } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/Slider';
import omit from 'lodash/omit';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

export const VALUE_ATTR = 'value';
export const DEFAULT_STATE = new Immutable.Map({
	[VALUE_ATTR]: undefined,
});

export const DISPLAY_NAME = 'Container(Slider)';

class Slider extends React.Component {
	static displayName = DISPLAY_NAME;

	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
	};

	static propTypes = {
		...cmfConnect.propTypes,
		id: PropTypes.string,
		value: PropTypes.number,
	};

	static defaultProps = {
		value: 0,
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onAfterChange = this.onAfterChange.bind(this);
	}

	onAfterChange(value) {
		if (this.props.onAfterChange) {
			this.props.onAfterChange(value);
		}
	}

	onChange(value) {
		this.props.setState(prevState => prevState.state.set(VALUE_ATTR, value));
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = {
			...omit(this.props, cmfConnect.INJECTED_PROPS),
			value: state.get(VALUE_ATTR, this.props.value),
			onChange: this.onChange,
			onAfterChange: this.onAfterChange,
		};
		return <Component {...props} />;
	}
}

export default Slider;
