import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { api } from 'react-cmf';
import Component from './HomeListView.component';
import { statePropTypes, initState } from '../state';

export const DEFAULT_STATE = new Map({

});

class HomeListView extends React.Component {
	static displayName = 'CMFContainer(HomeListView)';
	static propTypes = {
		...statePropTypes,
	};

	componentDidMount() {
		initState(this.props);
		if (this.props.didMountActionCreator) {
			this.props.dispatch(
				api.action.getActionCreatorFunction(
					this.context, this.props.didMountActionCreator
				)()
			);
		}
	}

	render() {
		const { sidepanel, list, children, ...props } = this.props;
		return (
			<Component
				sidepanel={sidepanel}
				list={list}
				{...props}
			>
				{children}
			</Component>
		);
	}
}

HomeListView.contextTypes = {
	store: PropTypes.object.isRequired,
	registry: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
};

export default HomeListView;
