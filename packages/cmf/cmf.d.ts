import type { ComponentType, ReactNode } from 'react';
import type { Store, Dispatch, AnyAction } from 'redux';

export interface CMFContext {
	store: Store;
	registry: any;
	[extra: string]: any;
}

export interface SagaProps {
	saga: (...args: any[]) => any;
	sagaAttributes?: any;
	children?: ReactNode;
}

export const App: ComponentType<any>;
export const Dispatcher: ComponentType<any>;
export const ErrorBoundary: ComponentType<any>;
export const Inject: ComponentType<any>;
export const RegistryProvider: ComponentType<any>;
export const Saga: ComponentType<SagaProps>;
export const CmfRegisteredSaga: ComponentType<SagaProps>;

export const actions: any;
export const action: (...args: any[]) => AnyAction;
export const actionCreator: {
	register: (name: string, creator: (...args: any[]) => AnyAction, context?: any) => void;
	unregister: (name: string) => void;
	get: (name: string) => (...args: any[]) => AnyAction;
	[id: string]: any;
};
export const bootstrap: (config?: any) => Promise<any>;
export const cmfConnect: (
	mapStateToProps?: any,
	mapDispatchToProps?: any,
	mergeProps?: any,
	options?: any,
) => (Component: ComponentType<any>) => ComponentType<any>;
export const cmfModule: any;
export const component: any;
export const componentState: any;
export const constants: any;
export const expression: any;
export const expressions: any;
export const localStorage: any;
export const matchPath: any;
export const middlewares: any;
export const onError: any;
export const reducers: any;
export const registry: any;
export const sagas: any;
export const selectors: any;
export const settings: any;
export const store: (...args: any[]) => Store;
export const mock: any;
export const useCMFContext: () => CMFContext;

export const getErrorMiddleware: any;
export const httpMiddleware: any;

declare const cmfDefault: {
	action: typeof action;
	actions: typeof actions;
	actionCreator: typeof actionCreator;
	bootstrap: typeof bootstrap;
	component: typeof component;
	connect: typeof cmfConnect;
	constants: typeof constants;
	CmfRegisteredSaga: typeof CmfRegisteredSaga;
	expression: typeof expression;
	expressions: typeof expressions;
	middlewares: typeof middlewares;
	module: typeof cmfModule;
	onError: typeof onError;
	registerInternals: (context?: any) => void;
	registry: typeof registry;
	router: {
		matchPath: typeof matchPath;
	};
	Saga: typeof Saga;
	saga: typeof sagas;
	sagas: typeof sagas;
	selectors: typeof selectors;
	settings: typeof settings;
	localStorage: typeof localStorage;
};

export default cmfDefault;
