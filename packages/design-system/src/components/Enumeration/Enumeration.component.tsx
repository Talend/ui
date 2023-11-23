import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
import { EmptyState } from '../EmptyState';
import { StackHorizontal } from '../Stack';
import { EnumerationMode, EnumerationProps, UiEnumerationItem } from './Enumeration.types';
import { EnumerationHeader } from './EnumerationHeader/EnumerationHeader.component';
import { EnumerationItem } from './EnumerationItem/EnumerationItem.component';

import styles from './Enumeration.module.scss';

export const Enumeration = ({
	id,
	items,
	loadMoreRows,
	onCreate,
	onChange,
	onEdit,
	onImport,
	onRemove,
	title,
}: EnumerationProps) => {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const [mode, setMode] = useState(EnumerationMode.VIEW);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [filteredItems, setFilteredItems] = useState(items);
	const [scrollToIndex, setScrollToIndex] = useState<number>();
	const [uiItems, setUiItems] = useState<UiEnumerationItem[]>(
		filteredItems.map(item => ({
			value: item,
			isToAnimate: false,
		})),
	);

	const setIsToAnimate = (itemsToAnimate: string[], isToAnimate: boolean) => {
		const newItems = [...uiItems];

		itemsToAnimate.forEach(itemToAnimate => {
			const indextToUpdate = newItems.findIndex(item => item.value === itemToAnimate);

			if (indextToUpdate < 0) {
				newItems.unshift({
					value: itemToAnimate,
					isToAnimate,
				});
			} else {
				newItems[indextToUpdate].isToAnimate = isToAnimate;
			}
		});

		setUiItems(newItems);
	};

	const onAnimate = (newItems: string[]) => {
		setScrollToIndex(0);
		setIsToAnimate(newItems, true);
		setTimeout(() => {
			setIsToAnimate(newItems, false);
			setScrollToIndex(undefined);
		}, 2500);
	};

	const handleOnCreate = async (newItem: string) => {
		try {
			if (newItem) {
				await onCreate?.(newItem);
				onChange([newItem, ...items]);
				onAnimate([newItem]);
			}
		} catch (e) {
			//The parent component must do the error handling
		}
	};

	const handleOnEdit = async (value: string, index: number) => {
		try {
			const indexToReplace = items.indexOf(filteredItems[index]);

			if (indexToReplace !== -1) {
				const newItems = [...items];
				newItems[indexToReplace] = value;
				onChange(newItems);
				onEdit?.(value);
			}
		} catch (e) {
			//The parent component must do the error handling
		}
	};

	const handleOnRemove = async (itemsToRemove: string[]) => {
		try {
			await onRemove?.(itemsToRemove);
			onChange(items.filter(item => !selectedItems.includes(item)));
		} catch (e) {
			//The parent component must do the error handling
		}
	};

	return (
		<div className={styles.enumeration}>
			<EnumerationHeader
				filteredItems={filteredItems}
				id={id}
				items={items}
				mode={mode}
				onCreate={handleOnCreate}
				onImport={(data: string) => {
					const newItems = data.split('\n').filter(Boolean);
					onImport?.(newItems);
					onAnimate(newItems);
				}}
				onRemove={handleOnRemove}
				selectedItems={selectedItems}
				setFilteredItems={setFilteredItems}
				setMode={setMode}
				setSelectedItems={setSelectedItems}
				title={title}
			/>

			{loadMoreRows && filteredItems.length ? (
				<InfiniteLoader
					isRowLoaded={({ index }) => !!filteredItems[index]}
					loadMoreRows={loadMoreRows}
					rowCount={filteredItems.length}
				>
					{({ onRowsRendered, registerChild }) => {
						const itemHeight = 38;
						return (
							<AutoSizer disableHeight={true}>
								{({ width }) => (
									<List
										scrollToIndex={scrollToIndex}
										height={Math.min(filteredItems.length * itemHeight, 400)}
										onRowsRendered={onRowsRendered}
										overscanRowCount={25}
										ref={registerChild}
										rowCount={filteredItems.length}
										rowHeight={itemHeight}
										rowRenderer={({ index, key, style }) => (
											<div style={style}>
												<EnumerationItem
													isToAnimate={uiItems[index]?.isToAnimate}
													key={key}
													mode={mode}
													onEdit={value => handleOnEdit(value, index)}
													onRemove={handleOnRemove}
													selectedItems={selectedItems}
													setSelectedItems={setSelectedItems}
													value={filteredItems[index]}
												/>
											</div>
										)}
										width={width}
									/>
								)}
							</AutoSizer>
						);
					}}
				</InfiniteLoader>
			) : (
				<StackHorizontal gap={0} padding={{ x: 0, y: 'M' }}>
					<EmptyState
						description={t('ENUMERATION_EMPTY_LIST_DESCRIPTION', 'Any additional details here.')}
						title={t('ENUMERATION_EMPTY_LIST_TITLE', 'The list is empty.')}
						variant={'M'}
					/>
				</StackHorizontal>
			)}
		</div>
	);
};
