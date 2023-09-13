import { createContext, ReactNode, useState } from 'react';

type TreeManagerContextValues = {
	closeAllPath: () => void;
	expandedPaths: string[];
	hasSemanticAwareness: boolean;
	highlightPath?: string;
	isPathExpanded: (path: string) => boolean;
	setHighlightPath: (path?: string) => void;
	togglePath: (path: string) => void;
};

export const TreeManagerContext = createContext<TreeManagerContextValues>({
	closeAllPath: () => {},
	expandedPaths: [],
	hasSemanticAwareness: false,
	highlightPath: undefined,
	isPathExpanded: () => false,
	setHighlightPath: () => {},
	togglePath: () => {},
});

export function TreeManagerContextProvider({
	children,
	hasSemanticAwareness = true,
	initialExpandedPaths = [],
}: {
	children: ReactNode;
	hasSemanticAwareness?: boolean;
	initialExpandedPaths?: string[];
}) {
	const [expandedPaths, setExpandedPath] = useState<string[]>(initialExpandedPaths);
	const [highlightPath, setHighlightPath] = useState<string>();

	const isPathExpanded = (path: string) => expandedPaths.includes(path);

	const togglePath = (path: string) => {
		if (expandedPaths.includes(path)) {
			setExpandedPath(expandedPaths.filter(p => p !== path));
		} else {
			setExpandedPath([...expandedPaths, path]);
		}
	};

	const closeAllPath = () => {
		setExpandedPath([]);
	};

	return (
		<TreeManagerContext.Provider
			value={{
				closeAllPath,
				expandedPaths,
				hasSemanticAwareness,
				highlightPath,
				isPathExpanded,
				setHighlightPath,
				togglePath,
			}}
		>
			{children}
		</TreeManagerContext.Provider>
	);
}
