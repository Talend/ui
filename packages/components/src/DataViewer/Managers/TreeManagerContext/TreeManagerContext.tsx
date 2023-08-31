import { createContext, ReactNode, useState } from 'react';

type TreeManagerContextValues = {
	expandedPaths: string[];
	togglePath: (path: string) => void;
};

const TreeManagerContext = createContext<TreeManagerContextValues>({
	expandedPaths: [],
	togglePath: () => {},
});

export function TreeManagerContextProvider({
	children,
	initialExpandedPaths = [],
}: {
	children: ReactNode;
	initialExpandedPaths?: string[];
}) {
	const [expandedPaths, setExpandedPath] = useState<string[]>(initialExpandedPaths);

	const togglePath = (path: string) => {
		if (expandedPaths.includes(path)) {
			setExpandedPath(expandedPaths.filter(p => p !== path));
		} else {
			setExpandedPath([...expandedPaths, path]);
		}
	};

	return (
		<TreeManagerContext.Provider value={{ expandedPaths, togglePath }}>
			{children}
		</TreeManagerContext.Provider>
	);
}
