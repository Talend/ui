import React, { useContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const TileContext = React.createContext();

export function useTileContext() {
	const context = useContext(TileContext);
	if (!context) {
		throw Error(
			'@talend/react-components > Tile: you are using a sub component out of Tile.Container.',
		);
	}
	return context;
}
