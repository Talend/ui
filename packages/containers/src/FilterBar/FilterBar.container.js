import { componentState, cmfConnect } from '@talend/react-cmf';
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Immutable from 'immutable';
import { FilterBar as Component } from '@talend/react-components';

export const QUERY_ATTR = 'query';
export const DEFAULT_STATE = new Immutable.Map({
	[QUERY_ATTR]: '',
	docked: true,
});

export const DISPLAY_NAME = 'Container(FilterBar)';

class FilterBar extends React.Component {
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
		dockable: PropTypes.bool,
	};

	static defaultProps = {
		dockable: true,
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
	}

	onToggle(event) {
		this.props.setState(prevState => {
			let state = prevState.state;
			if (this.props.dockable) {
				state = state.set('docked', !this.props.state.get('docked'));
			}
			return state.set(QUERY_ATTR, '');
		});
		if (this.props.onToggle) {
			this.props.onToggle(event);
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), {
			docked: state.get('docked'),
			value: state.get(QUERY_ATTR, ''),
			onToggle: this.onToggle,
			onFilter: this.onFilter,
		});
		return <Component {...props} />;
	}
}

export default FilterBar;
