import { cmfConnect } from '@talend/react-cmf';
import Immutable from 'immutable';
import get from 'lodash/get';
import Container from './DeleteResource.container';

export function mapStateToProps(state, ownProps) {
	if (ownProps.resourceType) {
		let resourceId = ownProps.resourceId;
		if (!resourceId) {
			resourceId = get(ownProps, 'routeParams.id');
		}
		const resource = state.cmf.collections
			.get(ownProps.resourceType, new Immutable.Map())
			.find(currentResource => currentResource.get('id') === resourceId);
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
