import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './SelectObject.container';


export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.source) {
		props.sourceData = state.cmf.collections.getIn(ownProps.source.split('.'));
	}
	if (ownProps.nameAttr && ownProps.tree) {
		props.tree = Object.assign({
			nameAttr: ownProps.nameAttr,
		}, ownProps.tree);
	}
	return props;
}

export default cmfConnect({
	mapStateToProps,
	defaultState: DEFAULT_STATE,
})(Container);
