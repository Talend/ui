import { createContext, useContext } from 'react';

interface DisclosureContextValue {
	disclosureId?: string | number;
	onSelect?: () => void;
	open?: boolean;
	panelId?: string;
}

export const DisclosureContext = createContext<DisclosureContextValue>({});

export function useDisclosureCtx() {
	return useContext(DisclosureContext);
}
