import { cmfConnect } from '@talend/react-cmf';
import Immutable from 'immutable';
import get from 'lodash/get';
import Container from './DeleteResource.container';

export function mapStateToProps(state, ownProps) {
	let resourceId = ownProps.resourceId;
	if (!resourceId) {
		resourceId = get(ownProps, `params.${ownProps.routerParamAttribute || 'id'}`);
	}
	if (ownProps.resourceType) {
		const resource = state.cmf.collections
			.get(ownProps.resourceType, new Immutable.Map())
			.find(currentResource => currentResource.get('id') === resourceId);
		return {
			resourceId,
			resource,
		};
	}
	return {
		resourceId,
	};
}

export default cmfConnect({
	defaultProps: {
		saga: 'DeleteResource#handle',
	},
	mapStateToProps,
})(Container);
