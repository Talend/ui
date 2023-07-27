import { FunctionComponent, Suspense, ReactNode } from 'react';

import { Unstyled } from '@storybook/blocks';
import tokens from '@talend/design-tokens';

import theme from './StatusTable.module.scss';

import statuses from '../../src/status.json';

export type Statuses = Record<
	string,
	{
		status?: ComponentStatus;
		figmaLink?: string;
		githubLink?: string;
	}
>;

export enum Status {
	OK = 'ok',
	KO = 'ko',
	WIP = 'wip',
	DEPRECATED = 'deprecated',
	NA = 'na',
	UNKNOWN = '❔', // This one is the default value, not designed to be used
}

export type ComponentStatus = {
	figma?: Status;
	storybook?: Status;
	react?: Status;
	i18n?: Status;
};

function withLink(children: ReactNode, href?: string) {
	return href ? (
		<a
			{...{
				href,
				target: '_blank',
				rel: 'noopener noreferrer',
			}}
		>
			{children}
		</a>
	) : (
		{ children }
	);
}

const getHTMLStatus = (status?: Status) => {
	const attrs = {
		className: theme.tag,
	};
	switch (status) {
		case Status.OK:
			return (
				<span
					{...attrs}
					style={{
						color: tokens.coralColorSuccessText,
						background: tokens.coralColorSuccessBackground,
					}}
				>
					Ready
				</span>
			);
		case Status.KO:
			return (
				<span
					{...attrs}
					style={{
						color: tokens.coralColorDangerText,
						background: tokens.coralColorDangerBackground,
					}}
				>
					To be defined
				</span>
			);
		case Status.WIP:
			return (
				<span
					{...attrs}
					style={{
						color: tokens.coralColorBetaText,
						background: tokens.coralColorDangerBackground,
					}}
				>
					In progress
				</span>
			);
		case Status.NA:
			return (
				<span
					{...attrs}
					style={{
						color: tokens.coralColorNeutralTextDisabled,
						background: tokens.coralColorNeutralBackgroundDisabled,
					}}
				>
					N/A
				</span>
			);
		default:
			return <span {...attrs}>{Status.UNKNOWN}</span>;
	}
};

const getComputedHTMLStatus = (status?: ComponentStatus) => {
	if (!status) {
		return getHTMLStatus(Status.UNKNOWN);
	}
	if (Object.values(status).find(s => s === Status.WIP)) {
		return getHTMLStatus(Status.WIP);
	}
	if (Object.values(status).every(s => s === Status.OK || s === Status.NA)) {
		return getHTMLStatus(Status.OK);
	}
	if (Object.values(status).every(s => s === Status.KO || s === Status.NA)) {
		return getHTMLStatus(Status.KO);
	}
	if (Object.values(status).every(s => s === Status.NA)) {
		return getHTMLStatus(Status.NA);
	}
	return '';
};

const StatusTable = (props: FunctionComponent & { filter?: string }) => {
	return (
		<Unstyled>
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
				<table className={`sbdocs sbdocs-table ${theme.table}`} {...props}>
					<thead>
						<tr>
							<th>Component</th>
							<th>Figma</th>
							<th>Storybook</th>
							<th>React</th>
							<th>i18n</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(statuses as Statuses).map(
							([componentId, { status, figmaLink, githubLink }], key) => {
								const { figma, react, storybook, i18n } = status || {};
								if (props.filter) {
									if (!componentId.includes(props.filter)) {
										return null;
									}
								}
								return (
									<tr key={key}>
										<td>
											{getComputedHTMLStatus(status)}{' '}
											{withLink(componentId, `?path=/docs/${componentId}`)}
										</td>
										<td>{withLink(getHTMLStatus(figma), figmaLink)}</td>
										<td>{getHTMLStatus(storybook)}</td>
										<td>{withLink(getHTMLStatus(react), githubLink)}</td>
										<td>{getHTMLStatus(i18n)}</td>
									</tr>
								);
							},
						)}
					</tbody>
				</table>
			</Suspense>
		</Unstyled>
	);
};

export default StatusTable;
