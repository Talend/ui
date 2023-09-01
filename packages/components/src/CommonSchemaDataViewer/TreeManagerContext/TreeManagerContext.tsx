import { createContext, ReactNode, useState } from 'react';

type TreeManagerContextValues = {
	expandedPaths: string[];
	highlightPath?: string;
	closeAllPath: () => void;
	togglePath: (path: string) => void;
	setHighlightPath: (path?: string) => void;
};

const TreeManagerContext = createContext<TreeManagerContextValues>({
	expandedPaths: [],
	highlightPath: undefined,
	closeAllPath: () => {},
	togglePath: () => {},
	setHighlightPath: () => {},
});

export function TreeManagerContextProvider({
	children,
	initialExpandedPaths = [],
}: {
	children: ReactNode;
	initialExpandedPaths?: string[];
}) {
	const [expandedPaths, setExpandedPath] = useState<string[]>(initialExpandedPaths);
	const [highlightPath, setHighlightPath] = useState<string>();

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
			value={{ expandedPaths, togglePath, closeAllPath, highlightPath, setHighlightPath }}
		>
			{children}
		</TreeManagerContext.Provider>
	);
}
