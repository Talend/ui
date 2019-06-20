import React, { useContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const virtualizedListContext = React.createContext();

export function useVirtualizedListContext() {
	const context = useContext(virtualizedListContext);
	if (!context) {
		throw Error(
			'@talend/react-components > VirtualizedList: you are using a sub component out of VirtualizedList.',
		);
	}
	return context;
}
