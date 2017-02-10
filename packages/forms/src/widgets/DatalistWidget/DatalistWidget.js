import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Autowhatever from 'react-autowhatever';
import theme from './DatalistWidget.scss';

/**
 * Render Simple typeahead widget for filtering among a list
 * @param props
 * @returns {*} DatalistWidget
 * @constructor
 */
const DatalistWidget = (props) => {
	const renderItem = (item, { value }) => {
		const splittedItem = !value ? [item] : item.split(value);
		const emphasisedItem = splittedItem.map((item, index) => (
			<span key={index}>
			{item}
				{index !== splittedItem.length - 1 &&
				<em className={theme['highlight-match']}>{value}</em>}
		</span>
		));
		return (
			<div className={theme.item}>
				<span className={theme['item-title']}>{emphasisedItem}</span>
			</div>
		);
	};

	const style = {
		container: theme['tf-typeahead-container'],
		containerOpen: theme['container-open'],
		highlight: theme['highlight-match'],
		input: theme['typeahead-input'],
		itemFocused: theme['item-focused'],
		itemsContainer: theme['items-container'],
		itemsList: theme.items
	};

	const renderInputComponent = (props) => {
		return (
			<div className={theme['typeahead-input-icon']}>
				<FormControl {...props} />
				<div className={theme['dropdown-toggle']}>
					<span className="caret"/>
				</div>
			</div>);
	};

	const ItemContainer = (items) => {
		return (props) => {
			if (items && !items.length) {
				return (
					<div className={`${theme['items-container']} ${theme['no-result']}`}>
						<span>No match.</span>
					</div>
				);
			}
			return (
				<div {...props}/>
			);
		}
	};

	return (
		<Autowhatever
			id={'exampleId'}
			items={props.schema.enum}
			renderItem={renderItem}
			//inputProps={inputProps}
			theme={style}
			//renderItemData={renderItemData}
			renderInputComponent={renderInputComponent}
			renderItemsContainer={ItemContainer(props.schema.enum)}
		/>
	);
};

export default DatalistWidget;
