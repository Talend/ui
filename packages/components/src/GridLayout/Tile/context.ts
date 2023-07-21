import { createContext, useContext } from 'react';

export type TileContextType = {
	displayMode: string;
	setDisplayMode: (mode: string) => void;
};

export const TileContext = createContext<TileContextType>({
	displayMode: '',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setDisplayMode: (mode: string) => {},
});

export function useTileContext() {
	const context = useContext(TileContext);
	return context;
}
