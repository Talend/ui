import { cmfConnect } from '@talend/react-cmf';
import Immutable from 'immutable';
import get from 'lodash/get';
import Container from './DeleteResource.container';

export function mapStateToProps(state, ownProps) {
	const props = {};
	let resourceId = ownProps.resourceId;
	if (!ownProps.resourceId) {
		resourceId = get(ownProps, `params.${ownProps.routerParamAttribute || 'id'}`);
		props.resourceId = resourceId;
	}

	if (ownProps.resource) {
		props.resource = ownProps.resource;
	} else {
		const collectionId = ownProps.collectionId || ownProps.resourceType;
		if (collectionId) {
			props.resource = state.cmf.collections
				.get(collectionId, new Immutable.Map())
				.find(currentResource => currentResource.get('id') === resourceId);
		}
	}

	return props;
}

export default cmfConnect({
	defaultProps: {
		saga: 'DeleteResource#handle',
	},

	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
