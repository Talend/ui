import { createContext, useContext } from 'react';
import invariant from 'invariant';
export const TimelineContext = createContext();

export function useTimelineContext() {
	const context = useContext(TimelineContext);
	invariant(
		context,
		'@talend/react-components > Timeline: you are using a sub component out of Timeline.',
	);
	return context;
}
