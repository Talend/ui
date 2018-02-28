import changeDocumentTitle from './documentTitle';
import http from './http';
import putActionCreator from './putActionCreator';
import * as collection from './collection';
import * as component from './component';

export default {
	// shortcut
	get: component.get,
	register: component.register,
	registerMany: component.registerMany,

	changeDocumentTitle,
	collection,
	component,
	http,
	putActionCreator,
};
