import React, { useContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const ListContext = React.createContext();

export function useListContext() {
	const context = useContext(ListContext);
	if (!context) {
		throw Error(
			'@talend/react-components > List: you are using a sub component out of List.Manager.',
		);
	}
	return context;
}
