import type { Store } from 'redux';

export type CMFRegistry = any;
export type CMFRouter = any;

export type CMFContext = {
	registry: CMFRegistry,
	router?: CMFRouter,
	store?: Store,
};
