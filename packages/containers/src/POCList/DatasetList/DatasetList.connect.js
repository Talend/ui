import { cmfConnect } from '@talend/react-cmf';
import Immutable from 'immutable';
import Component from './DatasetList.component';

function getCollection(state, collectionId) {
	return state.cmf.collections.get(collectionId);
}

function getCollectionItems(state, collectionId) {
	const collection = getCollection(state, collectionId);
	if (Immutable.Map.isMap(collection)) {
		return collection.get('items');
	}
	return collection;
}

const mapStateToProps = (state, props) => {
	return {
		items: getCollectionItems(state, props.collectionId),
	};
};

export default cmfConnect({ mapStateToProps })(Component);
