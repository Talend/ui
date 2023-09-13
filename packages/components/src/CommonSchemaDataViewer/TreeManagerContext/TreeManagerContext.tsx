import { createContext, ReactNode, useState } from 'react';

type TreeManagerContextValues = {
	modelClosedPath: string[];

	hasSemanticAwareness: boolean;
	highlightedPath?: string;
	isModelPathClosed: (path: string[]) => boolean;
	setHighlightedPath: (path?: string[]) => void;
	toggleModelPath: (path: string[]) => void;
};

export const TreeManagerContext = createContext<TreeManagerContextValues>({
	modelClosedPath: [],
	hasSemanticAwareness: false,
	highlightedPath: undefined,
	isModelPathClosed: () => false,
	setHighlightedPath: () => {},
	toggleModelPath: () => {},
});

export function TreeManagerContextProvider({
	children,
	hasSemanticAwareness = true,
}: {
	children: ReactNode;
	hasSemanticAwareness?: boolean;
}) {
	const [modelClosedPath, setModelClosedPath] = useState<string[]>([]);
	const [highlightedPath, internalSetHighlightedPath] = useState<string>();

	const isModelPathClosed = (path: string[]) => modelClosedPath.includes(path.join('.'));
	const toggleModelPath = (arrayPath: string[]) => {
		const path = arrayPath.join('.');
		if (modelClosedPath.includes(path)) {
			setModelClosedPath(modelClosedPath.filter(p => p !== path));
		} else {
			setModelClosedPath([...modelClosedPath, path]);
		}
	};

	const setHighlightedPath = (path?: string[]) => {
		if (!path) {
			internalSetHighlightedPath(undefined);
			return;
		}
		internalSetHighlightedPath(path.join('.'));
	};

	return (
		<TreeManagerContext.Provider
			value={{
				modelClosedPath,
				hasSemanticAwareness,
				highlightedPath,
				isModelPathClosed,
				setHighlightedPath,
				toggleModelPath,
			}}
		>
			{children}
		</TreeManagerContext.Provider>
	);
}
