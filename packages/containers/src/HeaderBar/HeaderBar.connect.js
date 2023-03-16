import cmf, { cmfConnect } from '@talend/react-cmf';
import get from 'lodash/get';
import Container, { DEFAULT_STATE } from './HeaderBar.container';
import Constants from './HeaderBar.constant';

const getHeaderActionProps = (actionName, ownProps, state) => {
	const expression = get(ownProps, `${actionName}.renderIfExpression`);
	let actionProps = null;

	if (expression) {
		actionProps = {
			...ownProps[actionName],
			...cmf.expression.mapStateToProps(state, ownProps[actionName]),
		};
		if (actionProps.renderIf === false) {
			actionProps = null;
		}
	}

	return actionProps;
};

export function mapStateToProps(state, ownProps) {
	return {
		productsItems: cmf.selectors.collections.toJS(state, Constants.COLLECTION_ID),
		callToAction: getHeaderActionProps('callToAction', ownProps, state),
		genericAction: getHeaderActionProps('genericAction', ownProps, state),
	};
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
