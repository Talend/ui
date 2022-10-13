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

import { HeaderComponentParams } from '../../types';

import theme from './HeaderCellRenderer.module.scss';

export type HeaderRendererProps = IHeaderParams & HeaderComponentParams;

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
	dqRule,
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
								<Tooltip title={truncate(description, { length: 1000 })} placement="bottom">
									<span className={theme['header-cell__description-tick']}>
										<SizedIcon name="information-stroke" size="S" />
									</span>
								</Tooltip>
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

					{dqRule && (
						<span className={theme['header-cell__dq-rule-icon']}>
							<SizedIcon name="law-hammer" size="S" />
						</span>
					)}
				</StackHorizontal>

				{quality && <QualityBar {...quality} {...qualityBarProps} />}
			</StackVertical>
		</div>
	);
}
