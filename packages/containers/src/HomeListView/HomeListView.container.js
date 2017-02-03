import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import Component from './HomeListView.component';
import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({

});

class HomeListView extends React.Component {
	static displayName = 'CMFContainer(HomeListView)';
	static propTypes = {
		name: PropTypes.string,
		...statePropTypes,

	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		stateWillMount(this.props);
	}

	componentDidMount() {
		if (this.props.didMountActionCreator) {
			this.props.dispatch(
				api.action.getActionCreatorFunction(
					this.context, this.props.didMountActionCreator
				)()
			);
		}
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				name={state.name}
			/>
		);
	}
}

HomeListView.contextTypes = {
	store: PropTypes.object.isRequired,
	registry: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
};

export default HomeListView;
