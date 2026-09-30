import { fromJS, isCollection, isIndexed } from 'immutable';
import getIn from './getIn';

const structure = {
	fromJS: jsValue =>
		fromJS(jsValue, (key, value) => (isIndexed(value) ? value.toList() : value.toMap())),
	getIn,
	merge: (state, payload) => state.merge(payload),
	toJS: value => (isCollection(value) ? value.toJS() : value),
};

export default structure;
