import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import omit from 'lodash/omit';
import { cmfConnect, Inject } from '@talend/react-cmf';
import PieChart from '@talend/react-components/lib/PieChart';

export const DEFAULT_STATE = new Immutable.Map({});

export function ContainerPieChartButton(props) {
	let overlayComponent = null;
	let onClick = null;

	if (typeof props.overlayComponent === 'string' && props.overlayComponent) {
		overlayComponent = (
			<Inject component={props.overlayComponent} {...props.overlayComponentProps} />
		);
	}

	if (!props.onClick) {
		onClick = (event, data) => {
			if (props.actionCreator) {
				props.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				props.dispatch({
					model: props.model,
					...props.payload,
				});
			}
		};
	}

	const state = props.state || DEFAULT_STATE;
	const model = state.has('model') ? state.get('model').toJS() : props.model;

	const newProps = {
		...omit(props, cmfConnect.INJECTED_PROPS.concat(['getComponent', 'initialState'])),
		model,
		inProgress: state.get('inProgress', props.inProgress),
		loading: state.get('loading', props.loading),
		available: state.get('available', props.available),
		overlayComponent,
		onClick,
	};

	return <PieChart.Button {...newProps} />;
}

ContainerPieChartButton.displayName = 'Container(PieChartButton)';

ContainerPieChartButton.propTypes = {
	...cmfConnect.propTypes,
	actionCreator: PropTypes.string,
	dispatch: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	model: PropTypes.object,
	onClick: PropTypes.func,
	overlayComponent: PropTypes.string,
	overlayComponentProps: PropTypes.object,
	payload: PropTypes.object,
};

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultState: DEFAULT_STATE,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerPieChartButton);
