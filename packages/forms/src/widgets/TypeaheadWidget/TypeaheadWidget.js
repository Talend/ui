import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Autowhatever from 'react-autowhatever';
import theme from './TypeaheadWidget.scss';

/**
 * Render Simple typeahead widget for filtering among a list
 * @param props
 * @returns {*} Typeahead
 * @constructor
 */
const SimpleTypeaheadWidget = (props) => {
	const inputProps = props.schema.inputProps;

	const renderItem = (item, { value }) => {
		const splittedItem = !value ? [item.text] : item.text.split(value);
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
				<p className={theme['item-description']}>{item.description}</p>
			</div>
		);
	};

	const style = {
		container: theme['tc-typeahead-container'],
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

	const renderItemData = { value: inputProps.value };
	return (
		<Autowhatever
			id={'exampleId'}
			items={props.schema.items}
			renderItem={renderItem}
			inputProps={inputProps}
			theme={style}
			renderItemData={renderItemData}
			renderInputComponent={renderInputComponent}
			renderItemsContainer={ItemContainer(props.schema.items)}
		/>
	);
};

export default SimpleTypeaheadWidget;
