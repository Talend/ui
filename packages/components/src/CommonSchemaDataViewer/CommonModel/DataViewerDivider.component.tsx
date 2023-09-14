import { Divider } from '@talend/design-system';

import theme from './CommonModel.module.scss';

export function DataViewerDivider({ path }: { path: string[] }) {
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
