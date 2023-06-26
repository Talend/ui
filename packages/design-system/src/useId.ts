import { randomUUID } from '@talend/utils';

export function useId(id?: string) {
	const [stableId, setId] = useState<string>(id || `id-${randomUUID()}`);
	useEffect(() => {
		if (id && stableId !== id) {
			setId(id);
		}
	}, [id, stableId]);
	return stableId;
}
