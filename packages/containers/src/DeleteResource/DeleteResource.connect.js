import { cmfConnect } from '@talend/react-cmf';
import Immutable from 'immutable';
import Container from './DeleteResource.container';

export function mapStateToProps(state, ownProps) {
	if (ownProps.resourceType) {
		const resource = state.cmf.collections
			.get(ownProps.resourceType, new Immutable.Map())
			.find(currentResource => currentResource.get('id') === ownProps.routeParams.id);
		return {
			resource,
		};
	}
	return {};
}

export default cmfConnect({
	componentId: ownProps => ownProps.id || ownProps.componentId,
	mapStateToProps,
})(Container);
