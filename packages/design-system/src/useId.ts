import { randomUUID } from '@talend/utils';
import { useEffect, useState } from 'react';

export function useId(id?: string, prefix = 'id') {
	const [stableId, setId] = useState<string>(id || `${prefix}-${randomUUID()}`);
	useEffect(() => {
		if (id && stableId !== id) {
			setId(id);
		}
	}, [id, stableId]);
	return stableId;
}
