import type { Store } from 'redux';
import type { Map } from 'immutable';

declare type CMFRegistry = any;
declare type CMFRouter = any;

declare type CMFContext = {
	registry: CMFRegistry,
	router?: CMFRouter,
	store?: Store,
};

declare type CMFStoreState = {
	cmf: {
		settings: {
			actions: any,
			contentTypes: any,
			views: any,
		},
		components: Map,
		collections: Map,
	}
};

declare type CMFEvent = Event
	| null
	| void
	| { type: string, target: string }
	| { props: any }
;

declare type CMFAction = {
	type: string,
};

declare type CMActionInfo = {
	label: string,
	icon?: string,
	payload?: {
		type: string,
	},
	actionCreator?: string,
	model?: any,
};

declare function CMFActionCreator(event: CMFEvent, data: any, context: CMFContext): CMFAction;

export {
	CMFContext,
	CMFEvent,
	CMFAction,
	CMFActionInfo,
	CMFActionCreator,
}
