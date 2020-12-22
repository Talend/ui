/**
 * Internal. This is the component which inject the registry as child context.
 * It is called by the App component
 * @module react-cmf/lib/RegistryProvider
 * @see module:react-cmf/lib/App
 */
import React from 'react';
import Registry from './registry';

export const RegistryContext = React.createContext(Registry.getRegistry());

export const RegistryProvider = RegistryContext.Provider;
