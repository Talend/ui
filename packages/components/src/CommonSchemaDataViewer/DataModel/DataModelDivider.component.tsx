import { Divider } from '@talend/design-system';

import theme from './DataModel.module.scss';

export function DataModelDivider({ path }: { path: string[] }) {
	return (
		<>
			{path.map((p, i) => (
				<div className={theme['model-path-divider']} key={i}>
					<Divider orientation="vertical" />
				</div>
			))}
		</>
	);
}
