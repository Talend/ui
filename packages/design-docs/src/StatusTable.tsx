import { Suspense } from 'react';
// eslint-disable-next-line @talend/import-depth
import statuses from '@talend/design-system/src/stories/status.json';
import { Statuses, ComponentStatuses } from '@talend/storybook-docs';
import theme from './StatusTable.module.scss';

function toTitleCase(value: string) {
	return value
		.replace(/([A-Z])/g, match => ` ${match}`)
		.replace(/^./, match => match.toUpperCase())
		.trim();
}

export function StatusTable() {
	return (
		<>
			<div className={theme.legend}>
				<dl className={theme.dl}>
					<dt>Figma</dt>
					<dd>
						All use cases have been designed, Figma library is ready to be consumed by designers.
					</dd>
					<dt>Storybook</dt>
					<dd>The guidelines are exhaustive and all sections have been completed.</dd>
					<dt>React</dt>
					<dd>The component is ready to be used by developers in their project.</dd>
					<dt>i18n</dt>
					<dd>
						Wording have been checked and translated on each supported languages by translators.
					</dd>
				</dl>
			</div>
			<Suspense fallback={<span>Loading status...</span>}>
				<table className={theme.table}>
					<thead>
						<tr>
							<th>Component</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(statuses).map(([componentId, info]) => {
							return (
								<tr key={componentId}>
									<td>{toTitleCase(componentId)}</td>
									<td>
										<ComponentStatuses {...(info as Statuses)} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</Suspense>
		</>
	);
}
