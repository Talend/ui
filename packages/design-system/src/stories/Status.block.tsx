import statuses from './status.json';
import { Statuses, ComponentStatuses } from '@talend/storybook-docs';

type StatusesConfig = Record<string, Statuses>;

export function Status({ id }: { id: string }) {
	const info = (statuses as StatusesConfig)[id];
	return <ComponentStatuses {...info} />;
}
