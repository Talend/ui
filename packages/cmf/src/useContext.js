import { useContext } from 'react';
import { useStore } from 'react-redux';
import { RegistryContext } from './RegistryProvider';

export function useCMFContext() {
	const store = useStore();
	const registry = useContext(RegistryContext);
	return {
		store,
		registry,
	};
}
