import React from 'react';
import { useStore } from 'react-redux';
import { RegistryContext } from './RegistryProvider';

export function useCMFContext() {
	const store = useStore();
	const registry = React.useContext(RegistryContext);
	return {
		store,
		registry,
	};
}
