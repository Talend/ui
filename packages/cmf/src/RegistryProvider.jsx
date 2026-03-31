/**
 * Internal. This is the component which inject the registry as child context.
 * It is called by the App component
 * @module react-cmf/lib/RegistryProvider
 * @see module:react-cmf/lib/App
 */
import { createContext } from 'react';
import Registry from './registry';

export const RegistryContext = createContext(Registry.getRegistry());
export const RegistryProvider = RegistryContext.Provider;

export default RegistryContext.Provider;
