import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

import { EmptyState } from '../EmptyState';
import { StackHorizontal } from '../Stack';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
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

	return (
		<div className={styles.enumeration}>
			<EnumerationHeader
				filteredItems={filteredItems}
				id={id}
				items={items}
				mode={mode}
				onChange={(newItem: string) => {
					onChange([newItem, ...items]);
					onAnimate([newItem]);
				}}
				onCreate={onCreate}
				onImport={(data: string) => {
					const newItems = data.split('\n').filter(Boolean);
					onImport?.(newItems);
					onAnimate(newItems);
				}}
				onRemove={onRemove}
				selectedItems={selectedItems}
				setFilteredItems={setFilteredItems}
				setMode={setMode}
				setSelectedItems={setSelectedItems}
				title={title}
			/>

			{filteredItems.length ? (
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
													onChange={value => {
														const indexToReplace = items.indexOf(filteredItems[index]);

														if (indexToReplace !== -1) {
															const newItems = [...items];
															newItems[indexToReplace] = value;
															onChange(newItems);
														}
													}}
													onRemove={onRemove}
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
