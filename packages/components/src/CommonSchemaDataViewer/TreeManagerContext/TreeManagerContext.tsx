import { createContext, ReactNode, useState } from 'react';

type TreeManagerContextValues = {
	modelClosedPath: string[];
	recordsOpenedPath: string[];
	hasSemanticAwareness: boolean;
	highlightedPath?: string;
	isRecordPathOpened: (path: string[]) => boolean;
	isModelPathClosed: (path: string[]) => boolean;
	isHighlightedPath: (path: string[]) => boolean;
	setHighlightedPath: (path?: string[]) => void;
	toggleRecordPath: (path: string[]) => void;
	toggleModelPath: (path: string[]) => void;
};

export const TreeManagerContext = createContext<TreeManagerContextValues>({
	modelClosedPath: [],
	recordsOpenedPath: [],
	hasSemanticAwareness: false,
	highlightedPath: undefined,
	isRecordPathOpened: () => false,
	isModelPathClosed: () => false,
	isHighlightedPath: () => false,
	setHighlightedPath: () => {},
	toggleRecordPath: () => {},
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
	const [recordsOpenedPath, setRecordsOpenedPath] = useState<string[]>([]);
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

	const isRecordPathOpened = (path: string[]) => recordsOpenedPath.includes(path.join('.'));
	const toggleRecordPath = (arrayPath: string[]) => {
		const path = arrayPath.join('.');
		if (recordsOpenedPath.includes(path)) {
			setRecordsOpenedPath(recordsOpenedPath.filter(p => p !== path));
		} else {
			setRecordsOpenedPath([...recordsOpenedPath, path]);
		}
	};

	const setHighlightedPath = (path?: string[]) => {
		if (!path || path.join('.') === highlightedPath) {
			internalSetHighlightedPath(undefined);
			return;
		}
		internalSetHighlightedPath(path.join('.'));
	};
	const isHighlightedPath = (path: string[]) => {
		if (!highlightedPath) {
			return false;
		}
		return highlightedPath === path.join('.');
	};

	return (
		<TreeManagerContext.Provider
			value={{
				modelClosedPath,
				hasSemanticAwareness,
				recordsOpenedPath,
				highlightedPath,
				isModelPathClosed,
				isHighlightedPath,
				isRecordPathOpened,
				setHighlightedPath,
				toggleRecordPath,
				toggleModelPath,
			}}
		>
			{children}
		</TreeManagerContext.Provider>
	);
}
