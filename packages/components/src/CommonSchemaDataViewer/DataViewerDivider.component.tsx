import { Divider } from '@talend/design-system';

export function DataViewerDivider({ path }: { path: string[] }) {
	return (
		<>
			{path.map((p, i) => (
				<div
					style={{ display: 'flex', width: '1.5rem', justifyContent: 'center', height: '100%' }}
					key={i}
				>
					<Divider orientation="vertical" />
				</div>
			))}
		</>
	);
}
