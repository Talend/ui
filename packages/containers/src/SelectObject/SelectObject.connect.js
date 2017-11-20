import { cmfConnect } from '@talend/react-cmf';

import Container, { DISPLAY_NAME, DEFAULT_STATE } from './SelectObject.container';


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
	const filterPath = [DISPLAY_NAME, ownProps.id];
	const filterState = state.cmf.components.getIn(filterPath);
	if (filterState) {
		props.query = filterState.get('query', '');
	} else {
		props.query = '';
	}
	return props;
}

export default cmfConnect({
	mapStateToProps,
	defaultState: DEFAULT_STATE,
})(Container);
