// @flow
import type { Store } from 'redux';
import type { Map } from 'immutable';

export type Id = string;

export type CMFRegistry = any;
export type CMFRouter = any;

export type CMFContext = {
	registry: CMFRegistry,
	router?: CMFRouter,
	store?: Store<CMFStoreState, CMFAction>,
};

export type CMFStoreState = {
	cmf: {
		settings: {
			actions: any,
			contentTypes: any,
			views: any,
		},
		components: Map<Id, any>,
		collections: Map<Id, any>,
	}
};

export type CMFEvent = Event
	| null
	| void
	| { type: string, target: string }
	| { props: any }
;

export type CMFAction = {
	type: string,
};

export type CMActionInfo = {
	label: string,
	icon?: string,
	payload?: {
		type: string,
	},
	actionCreator?: string,
	model?: any,
};

export type CMFActionCreator = (event: CMFEvent, data: any, context: CMFContext) => CMFAction;
