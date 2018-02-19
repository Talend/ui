import { cmfConnect } from '@talend/react-cmf';

import Container from './datagrid.container';

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.source) {
		props.data = state.cmf.collections.getIn(ownProps.source.split('.'));
	}

	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.source) {
		delete props.source;
	}

	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(Container);
