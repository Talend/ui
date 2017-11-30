import { componentState } from '@talend/react-cmf';

/* eslint-disable no-console */
console.warn(`DEPRECATION WARNING: import state, {} from '@talend/react-containers'; is deprecated.
You should import { componentState } from '@talend/react-cmf'`);
/* eslint-enable no-console */

export default componentState;

export const getStateAccessors = componentState.getAccessors;
export const getStateProps = componentState.getProps;
export const initState = componentState.init;
export const stateWillMount = props => {
	/* eslint-disable no-console */
	console.log(
		`DEPRECATION Warning: you should use initState
		in componentDidMount instead.
		https://github.com/facebook/react/issues/7671`,
	);
	/* eslint-enable no-console */
	componentState.init(props);
};
export const statePropTypes = componentState.propTypes;
