import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { RegistryContext } from '../lib/RegistryProvider';

export function useCMFContext() {
	const store = React.useContext(ReactReduxContext).store;
	const registry = React.useContext(RegistryContext);
	return {
		store,
		registry,
	};
}
