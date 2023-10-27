import { EnumerationItem, EnumerationProps } from './Enumeration.types';

import { ButtonIcon, ButtonIconToggle } from '../ButtonIcon';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
import { ChangeEvent, useState } from 'react';
import { Form } from '../Form';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import { Divider } from '../Divider';

import style from './Enumeration.module.scss';
import { StackHorizontal } from '../Stack';
import { EmptyState } from '../EmptyState';

export const Enumeration = ({ items, loadMoreRows, onImport, title }: EnumerationProps) => {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
	const [seletedAction, setSelectedAction] = useState<string>();
	const [filteredItems, setFilteredItems] = useState<EnumerationItem[]>(items);

	const rowRenderer = ({ index }: { index: number }) => (
		<StackHorizontal
			align={'center'}
			as="ul"
			gap={0}
			justify="spaceBetween"
			key={filteredItems[index].id}
			padding={{ x: 'S', y: 'XXS' }}
		>
			<p>{filteredItems[index].label}</p>
			<ButtonIcon icon="dots-vertical" onClick={() => {}} size="S">
				{t('ENUMERATION_IMPORT', 'Import items')}
			</ButtonIcon>
		</StackHorizontal>
	);

	const ListEmptyState = () => (
		<StackHorizontal gap={0} padding={{ x: 0, y: 'M' }}>
			<EmptyState
				description={t('ENUMERATION_EMPTY_LIST_DESCRIPTION', 'Any additional details here.')}
				title={t('ENUMERATION_EMPTY_LIST_TITLE', 'The list is empty.')}
				variant={'M'}
			/>
		</StackHorizontal>
	);

	const filterList = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (!value) {
			setFilteredItems(items);
		} else {
			setFilteredItems(items.filter(item => item.id.includes(value)));
		}
	};

	const isRowLoaded = ({ index }: { index: number }) => {
		return !!items[index];
	};

	return (
		<div className={style.enumeration}>
			<div className={style.enumeration__header}>
				<div className={style.enumeration__title}>
					<h4>{title}</h4>

					<StackHorizontal as="ul" gap={'XS'} justify="end">
						{onImport && (
							<li>
								<ButtonIcon icon="import" onClick={() => {}} size="S">
									{t('ENUMERATION_IMPORT', 'Import items')}
								</ButtonIcon>
								<Divider orientation="vertical" />
							</li>
						)}
						<li>
							<ButtonIconToggle
								disabled={!!seletedAction && seletedAction !== 'add'}
								icon="plus"
								isActive={seletedAction === 'add'}
								onClick={() => {
									setSelectedAction(seletedAction === 'add' ? undefined : 'add');
								}}
								size="S"
							>
								{t('ENUMERATION_ADD', 'Add item')}
							</ButtonIconToggle>
						</li>
						<li>
							<ButtonIconToggle
								disabled={!!seletedAction && seletedAction !== 'edit'}
								icon="pencil"
								isActive={seletedAction === 'edit'}
								onClick={() => {
									setSelectedAction(seletedAction === 'edit' ? undefined : 'edit');
								}}
								size="S"
							>
								{t('ENUMERATION_EDIT', 'Edit item')}
							</ButtonIconToggle>
						</li>
					</StackHorizontal>
				</div>

				<Form.Search
					placeholder="Search"
					name="search"
					label="Search"
					onChange={filterList}
					hideLabel
				/>
			</div>

			{filteredItems.length ? (
				<AutoSizer disableHeight={true}>
					{({ width }) => {
						const itemHeight = 36;

						return (
							<InfiniteLoader
								isRowLoaded={isRowLoaded}
								loadMoreRows={loadMoreRows}
								rowCount={filteredItems.length}
							>
								{({ onRowsRendered, registerChild }) => (
									<List
										height={filteredItems.length * itemHeight}
										onRowsRendered={onRowsRendered}
										ref={registerChild}
										rowCount={filteredItems.length}
										rowHeight={itemHeight}
										rowRenderer={rowRenderer}
										width={width}
									/>
								)}
							</InfiniteLoader>
						);
					}}
				</AutoSizer>
			) : (
				<ListEmptyState />
			)}
		</div>
	);
};
