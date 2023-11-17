import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

import { EmptyState } from '../EmptyState';
import { StackHorizontal } from '../Stack';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
import { EnumerationMode, EnumerationProps } from './Enumeration.types';
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

	return (
		<div className={styles.enumeration}>
			<EnumerationHeader
				filteredItems={filteredItems}
				id={id}
				items={items}
				mode={mode}
				onChange={onChange}
				onCreate={onCreate}
				onImport={onImport}
				onRemove={onRemove}
				selectedItems={selectedItems}
				setFilteredItems={setFilteredItems}
				setMode={setMode}
				setSelectedItems={setSelectedItems}
				title={title}
			/>

			{filteredItems.length ? (
				<div className={styles.enumeration__body}>
					<AutoSizer disableHeight={true}>
						{({ width }) => {
							const itemHeight = 38;

							return (
								<InfiniteLoader
									isRowLoaded={({ index }) => !!items[index]}
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
											rowRenderer={({ index }) => (
												<EnumerationItem
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
											)}
											width={width}
										/>
									)}
								</InfiniteLoader>
							);
						}}
					</AutoSizer>
				</div>
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
