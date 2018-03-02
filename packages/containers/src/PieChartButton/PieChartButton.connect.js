import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import omit from 'lodash/omit';
import { componentState, cmfConnect, Inject } from '@talend/react-cmf';
import PieChartButton from '@talend/react-components/lib/PieChartButton';

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
	const newProps = {
		...omit(props, cmfConnect.INJECTED_PROPS.concat(['getComponent', 'initialState'])),
		model: state.get('model', props.model),
		inProgress: state.get('inProgress', props.inProgress),
		overlayComponent,
		onClick,
	};

	return <PieChartButton {...newProps} />;
}

ContainerPieChartButton.displayName = 'Container(PieChartButton)';

ContainerPieChartButton.propTypes = {
	...componentState.propTypes,
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
})(ContainerPieChartButton);
