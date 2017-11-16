import { componentState, cmfConnect } from '@talend/react-cmf';
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Immutable from 'immutable';
import { Filter as Component } from '@talend/react-components';

export const DEFAULT_STATE = new Immutable.Map({
	query: '',
	docked: false,
});

export const DISPLAY_NAME = 'Container(Filter)';

class Filter extends React.Component {
	static displayName = DISPLAY_NAME;

	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
	};

	static propTypes = {
		...componentState.propTypes,
		id: PropTypes.string,
		placeholder: PropTypes.string,
		filterInputValue: PropTypes.string,
		toggeable: PropTypes.bool,
	};

	static defaultProps = {
		toggeable: true,
	};

	constructor(props) {
		super(props);
		this.onFilter = this.onFilter.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}

	onFilter(event, value) {
		this.props.setState({
			query: value,
		});
		if (this.props.onFilter) {
			this.props.onFilter(event, {
				query: value,
				props: this.props,
			});
		}
		if (this.props.onFilterActionCreator) {
			this.props.dispatchActionCreator(this.props.onFilterActionCreator, event, {
				props: this.props,
			});
		}
	}

	onToggle(event) {
		this.props.setState((prevState => {
			let state = prevState.state;
			if (this.props.toggeable) {
				state = state.set('docked', !this.props.state.get('docked'));
			}
			state = state.set('query', '');
			return state;
		}));
		if (this.props.onToggleActionCreator) {
			this.props.dispatchActionCreator(this.props.onToggleActionCreator);
		}
		if (this.props.onToggle) {
			this.props.onToggle(event);
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = Object.assign(
			{},
			omit(this.props, cmfConnect.INJECTED_PROPS),
			{
				docked: state.get('docked'),
				value: state.get('query'),
				onToggle: this.onToggle,
				onFilter: this.onFilter,
			},
		);
		return <Component {...props} />;
	}
}

export default Filter;
