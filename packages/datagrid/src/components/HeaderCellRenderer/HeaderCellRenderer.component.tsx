import React from 'react';
import { useTranslation } from 'react-i18next';

import { IHeaderParams } from 'ag-grid-community';
import classNames from 'classnames';
import truncate from 'lodash/truncate';

import { Icon, Tooltip, ButtonIcon, StackHorizontal, StackVertical } from '@talend/design-system';
import { QualityBar } from '@talend/react-components';

import { QUALITY_INVALID_KEY, QUALITY_EMPTY_KEY, QUALITY_VALID_KEY } from '../../constants';
import { HeaderComponentParams } from '../../types';

import theme from './HeaderCellRenderer.scss';

export type HeaderRendererProps = IHeaderParams &
	HeaderComponentParams & {
		onFocusedColumn(colId: string): void;
		onKeyDown(event: React.KeyboardEvent<HTMLElement>, colId: string): void;
	};

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
	qualityBarProps,
	displayName,
	onFocusedColumn,
	onKeyDown,
}: HeaderRendererProps): JSX.Element {
	const { t } = useTranslation();
	const colId = column.getColId();

	return (
		<div
			className={classNames(theme['header-cell'], {
				[theme['header-cell--loading']]: isLoading,
				[theme['header-cell--type-draft']]: !!draftType,
			})}
		>
			<div
				onClick={() => onFocusedColumn(colId)}
				onKeyDown={event => onKeyDown(event, colId)}
				role="button"
				tabIndex={0}
			>
				<StackHorizontal gap="XXS" justify="spaceBetween" align="center">
					<div className={theme['header-cell__first-line']}>
						<StackHorizontal gap="XXS">
							<div className={theme['header-cell__title']} title={displayName}>
								{displayName}
								{required && <abbr title={t('REQUIRED_FIELD', 'Required')}>*</abbr>}
							</div>
							{description && (
								<Tooltip title={truncate(description, { length: 1000 })} placement="bottom">
									<span className={theme['header-cell__description-tick']}>
										<Icon name="talend-info-circle" />
									</span>
								</Tooltip>
							)}
						</StackHorizontal>
						<div
							className={theme['header-cell__type']}
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
					</div>
					{menuProps && (
						<div className={theme['header-cell__menu-button']}>
							<ButtonIcon icon="talend-ellipsis" size="XS" disabled={isLoading} {...menuProps} />
						</div>
					)}
				</StackHorizontal>
			</div>
			{quality && (
				<QualityBar
					invalid={quality[QUALITY_INVALID_KEY]}
					empty={quality[QUALITY_EMPTY_KEY]}
					valid={quality[QUALITY_VALID_KEY]}
					{...qualityBarProps}
				/>
			)}
		</div>
	);
}
