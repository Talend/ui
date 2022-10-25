import React from 'react';
import { useTranslation } from 'react-i18next';

import { IHeaderParams } from 'ag-grid-community';
import classNames from 'classnames';
import truncate from 'lodash/truncate';

import {
	ButtonIcon,
	SizedIcon,
	StackHorizontal,
	StackVertical,
	Tooltip,
} from '@talend/design-system';
import { QualityBar } from '@talend/react-components';
import { IconNameWithSize } from '@talend/icons';

import { HeaderComponentParams } from '../../types';

import theme from './HeaderCellRenderer.module.scss';

export type HeaderRendererProps = IHeaderParams & HeaderComponentParams;

function IconWithTooltip({ icon, tooltip }: { icon: IconNameWithSize<'S'>; tooltip: string }) {
	return (
		<Tooltip title={tooltip} placement="top">
			<span className={theme['header-cell__description-tick']}>
				<SizedIcon name={icon} size="S" />
			</span>
		</Tooltip>
	);
}

/**
 * Props are provided by column definition headerComponentParams
 * https://www.ag-grid.com/javascript-data-grid/component-header/#custom-header-parameters
 */
export default function HeaderCellRenderer({
	column,
	quality,
	typeLabel,
	semanticTypeLabel,
	required,
	description,
	isLoading,
	draftType,
	menuProps,
	nbAppliedDqRules,
	qualityBarProps,
	displayName,
	onFocus,
}: HeaderRendererProps): JSX.Element {
	const { t } = useTranslation();

	return (
		// We can't reach this node using keyboard for now, we need to fix it by suppressing default keyboard interactions
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div
			className={classNames(theme['header-cell'], {
				[theme['header-cell--loading']]: isLoading,
				[theme['header-cell--type-draft']]: !!draftType,
			})}
			onClick={
				onFocus
					? event =>
							onFocus({
								event,
								column,
							})
					: undefined
			}
		>
			<StackVertical gap="XXS">
				<StackHorizontal gap="XS" justify="spaceBetween" isFullWidth>
					<div className={theme['header-cell__top-row']}>
						<StackHorizontal gap="XXS">
							<div
								data-testid="column.header.title"
								className={theme['header-cell__title']}
								title={displayName}
							>
								{displayName}
								{required && <abbr title={t('REQUIRED_FIELD', 'Required')}>*</abbr>}
							</div>

							{description && (
								<IconWithTooltip
									icon="information-stroke"
									tooltip={truncate(description, { length: 1000 })}
								/>
							)}
						</StackHorizontal>
					</div>

					{menuProps && (
						<ButtonIcon icon="dots-vertical" size="XS" disabled={isLoading} {...menuProps} />
					)}
				</StackHorizontal>

				<StackHorizontal gap="M" isFullWidth>
					<div
						className={theme['header-cell__type']}
						data-testid="column.header.type"
						title={draftType ?? `${semanticTypeLabel} (${typeLabel})`}
					>
						{semanticTypeLabel && !draftType ? (
							<>
								{semanticTypeLabel}
								<span className={theme['header-cell__sub-type']}> ({typeLabel})</span>
							</>
						) : (
							draftType ?? typeLabel
						)}
					</div>

					{nbAppliedDqRules && (
						<IconWithTooltip
							icon="law-hammer"
							tooltip={t('HEADER_CELL_RENDERER_NB_APPLIED_DQ_RULES', {
								defaultValue: '{{ count }} rule is applied to this dataset',
								defaultValue_plural: '{{ count }} rules are applied to this dataset',
								count: nbAppliedDqRules,
							})}
						/>
					)}
				</StackHorizontal>

				{quality && <QualityBar {...quality} {...qualityBarProps} />}
			</StackVertical>
		</div>
	);
}
