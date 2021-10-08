import { createContext, useContext } from 'react';
import invariant from 'invariant';

const badgeFacetedContext = createContext();

const useBadgeFacetedContext = () => {
	const context = useContext(badgeFacetedContext);
	invariant(
		context,
		'[badgeFacetedContext]: You are using a badge faceted component outside its context',
	);
	return context;
};

const BadgeFacetedProvider = badgeFacetedContext.Provider;

export { BadgeFacetedProvider, useBadgeFacetedContext };
