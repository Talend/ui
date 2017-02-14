import React, {Component, PropTypes} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Autowhatever from 'react-autowhatever';
import theme from './DatalistWidget.scss';

/**
 * Render Simple typeahead widget for filtering among a list
 * @param props
 * @returns {*} DatalistWidget
 * @constructor
 */

class DatalistWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			items: [],
			itemIndex: null,
			noMatch: false,
		};

		this.renderItem = this.renderItem.bind(this);
		this.renderInputComponent = this.renderInputComponent.bind(this);

		this.inputProps = {
			placeholder: 'Search ...',
			required: this.props.required,
			onBlur: () => {
				this.setState({ items: [] });
			},
			onFocus: () => {
				this.setState({ items: this.getMatchingSuggestions(this.state.value) });
			},
			onChange: event => {
				const newValue = event.target.value;
				this.setState({
					value: newValue,
					items: this.getMatchingSuggestions(newValue),
				});
			},
			onKeyDown: (event, { focusedItemIndex, newFocusedItemIndex }) => {
				switch (event.which) {
				case 27:
					this.setState({
						value: '',
						items: [],
						noMatch: false,
					});
					event.preventDefault();
					break;
				case 13:
					if (focusedItemIndex != null) { // could be null in case of no match
						this.setState({
							value: this.state.items[focusedItemIndex],
							items: [],
						});
						this.props.onChange(this.state.items[focusedItemIndex]);
					}
					event.preventDefault();
					break;
				case 38:
				case 40:
					this.setState({
						itemIndex: newFocusedItemIndex,
					});
					break;
				}
			},
		};

		this.itemProps = {
			onMouseEnter: (event, { itemIndex }) => {
				this.setState({ itemIndex });
			},
			onMouseLeave: () => {
				this.setState({ itemIndex: null });
			},
			onMouseDown: (event, { itemIndex }) => {
				this.setState({
					value: this.state.items[itemIndex],
					items: [],
				});
				this.props.onChange(this.state.items[itemIndex]);
			},
		};

		this.style = {
			container: theme['tf-typeahead-container'],
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};
	}

	escapeRegexCharacters(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	getMatchingSuggestions(value) {
		const escapedValue = this.escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return this.props.schema.enum;
		}

		const regex = new RegExp(escapedValue, 'i');

		const matchingItems = this.props.schema.enum.filter(item => regex.test(item));
		this.setState({ noMatch: !matchingItems.length });
		return matchingItems;
	}

	renderItem(item, { value }) {
		let emphasisedItem = [];
		if (value) {
			const matchPositions = [];
			const regExp = new RegExp(value, 'gi');
			let match;
			while ((match = regExp.exec(item)) != null) { // eslint-disable-line no-cond-assign
				matchPositions.push(match.index);
			}
			const matchSize = value.length;
			for (let i = 0; i < item.length; i++) {
				if (matchPositions.indexOf(i) === -1) {
					emphasisedItem.push(item[i]);
				} else {
					emphasisedItem.push((<em className={theme['highlight-match']}>
						{item.substring(i, i + matchSize)}</em>));
					i += matchSize - 1;
				}
			}
		} else {
			emphasisedItem = item;
		}
		return (
			<div className={theme.item}>
				<span className={theme['item-title']}>{emphasisedItem}</span>
			</div>
		);
	}

	renderInputComponent(props) {
		return (
			<div className={theme['typeahead-input-icon']}>
				<FormControl {...props} />
				<div className={theme['dropdown-toggle']}>
					<span className="caret"/>
				</div>
			</div>);
	}

	getItemContainer() {
		return (props) => {
			if (this.state.noMatch) {
				return (
					<div className={`${theme['items-container']} ${theme['no-result']}`}>
						<span>No match.</span>
					</div>
				);
			}
			return (
				<div {...props} />
			);
		};
	}

	render() {
		const renderItemData = { value: this.state.value };
		this.inputProps.value = this.state.value;
		return (
			<Autowhatever
				id={'exampleId'}
				items={this.state.items}
				renderItem={this.renderItem}
				inputProps={this.inputProps}
				theme={this.style}
				renderItemData={renderItemData}
				renderInputComponent={this.renderInputComponent}
				renderItemsContainer={this.getItemContainer.call(this)}
				focusedItemIndex={this.state.itemIndex}
				itemProps={this.itemProps}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	DatalistWidget.propTypes = {
		id: PropTypes.string,
		formData: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		registry: PropTypes.shape({
			widgets: PropTypes.objectOf(PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.object,
			])).isRequired,
			fields: PropTypes.objectOf(PropTypes.func).isRequired,
			definitions: PropTypes.object.isRequired,
			formContext: PropTypes.object.isRequired,
		}),
		schema: PropTypes.object.isRequired,
		uiSchema: PropTypes.object,
		definitions: PropTypes.object,
	};
}

export default DatalistWidget;
