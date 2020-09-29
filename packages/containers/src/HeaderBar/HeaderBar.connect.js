import cmf, { cmfConnect } from '@talend/react-cmf';
import get from 'lodash/get';
import Container, { DEFAULT_STATE } from './HeaderBar.container';
import Constants from './HeaderBar.constant';

export function mapStateToProps(state, ownProps) {
	const props = {
		productsItems: cmf.selectors.collections.toJS(state, Constants.COLLECTION_ID),
	};
	const expression = get(ownProps, 'callToAction.renderIfExpression');
	if (expression) {
		props.callToAction = {
			...ownProps.callToAction,
			...cmf.expression.mapStateToProps(state, ownProps.callToAction),
		};
		if (props.callToAction.renderIf === false) {
			props.callToAction = null;
		}
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,

	defaultProps: {
		saga: 'HeaderBar#default',
	},

	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
