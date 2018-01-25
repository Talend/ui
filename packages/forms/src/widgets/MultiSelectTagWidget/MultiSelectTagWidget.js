import PropTypes from 'prop-types';
import React from 'react';
import Badge from '@talend/react-components/lib/Badge';
import Typeahead from '@talend/react-components/lib/Typeahead';
import classNames from 'classnames';
import keycode from 'keycode';
import theme from './MultiSelectTagWidget.scss';

const DROP_DOWN_ITEM_HEIGHT = 49;

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function mapValueToLabel(enumOptions) {
	return enumOptions.reduce((map, option) => {
		map[option.value] = option; // eslint-disable-line no-param-reassign
		return map;
	}, {});
}

/**
 * transform enumOptions - to handle object type enumName
 * @param options
 * @returns {Array}
 */
function transformOptions(options) {
	if (options && options.groupBy) {
		return options.enumOptions.map(opt => ({ ...opt.label, value: opt.value }));
	}
	return options.enumOptions;
}

/**
 * filter options - to filter out options which already included in value
 * @param props
 * @returns {Array.<*>}
 */
function filterOptions(props) {
	return transformOptions(props.options).filter(option => props.value.indexOf(option.value) < 0);
}

class MultiSelectTagWidget extends React.Component {
	constructor(props) {
		super(props);
		this.withCategory = typeof props.options.groupBy !== 'undefined';
		this.state = {
			filterText: '',
			isFocused: false,
		};
		this.theme = {
			container: theme.typeahead,
			itemsContainer: classNames(theme['items-container'], 'items-container'),
		};

		this.onFocus = this.onFocus.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCaretClick = this.onCaretClick.bind(this);
		this.getDropdownItems = this.getDropdownItems.bind(this);
		this.updateSuggestions = this.updateSuggestions.bind(this);
		this.resetSuggestions = this.resetSuggestions.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value === this.props.value) {
			return;
		}
		if (this.state.suggestions) {
			this.resetSuggestions();
		}
	}

	onSelect(event, { itemIndex, sectionIndex }) {
		const { onChange, value } = this.props;

		let currentItem;
		if (sectionIndex !== null) {
			currentItem = this.state.items[sectionIndex].suggestions[itemIndex];
		} else {
			currentItem = this.state.items[itemIndex];
		}

		let currentValue;
		const currentLabel = currentItem.label || currentItem;
		if (currentLabel === `${this.state.filterText} (new)`) {
			currentValue = this.state.filterText;
		} else {
			currentValue = currentItem.value || currentItem;
		}

		const nextValue = value.concat(currentValue);
		onChange(nextValue);

		this.setState({ filterText: '' });
	}

	onRemoveTag(tagValue) {
		const { onChange, value } = this.props;
		const nextValue = value.filter(val => val !== tagValue);
		onChange(nextValue);
	}

	onKeyDown(
		event,
		{ focusedItemIndex, newFocusedItemIndex, focusedSectionIndex, newFocusedSectionIndex },
	) {
		switch (event.which) {
			case keycode.codes.backspace: {
				if (this.state.filterText === '' && this.props.value.length > 0) {
					this.onRemoveTag(this.props.value[this.props.value.length - 1]);
				}
				break;
			}
			case keycode.codes.enter: {
				if (this.state.suggestions.length > 0) {
					this.onSelect(event, {
						itemIndex: focusedItemIndex,
						sectionIndex: focusedSectionIndex,
					});
				} else if (this.state.filterText.length > 0) {
					const { schema } = this.props;
					if (schema.createIfNoneMatch) {
						this.onSelect(event, { itemIndex: 0 });
					}
				}
				event.preventDefault();
				break;
			}
			case keycode.codes.up:
			case keycode.codes.down: {
				event.preventDefault();
				this.scrollDropDownIfRequired(
					{
						itemIndex: newFocusedItemIndex,
						sectionIndex: newFocusedSectionIndex,
					},
					event.which,
				);
				this.setState({
					focusedItemIndex: newFocusedItemIndex,
					focusedSectionIndex: newFocusedSectionIndex,
				});
				break;
			}
			default:
				break;
		}
	}

	onFocus() {
		this.updateSuggestions('');
	}

	onChange(event, { value }) {
		this.updateSuggestions(value);
	}

	onCaretClick() {
		const input = this.component.querySelector('input');
		if (this.state.isFocused) {
			input.blur();
		} else {
			input.focus();
		}
		this.setState(state => ({ isFocused: !state.isFocused }));
	}

	setComponentRef(component) {
		this.component = component;
	}

	getOptionsToShow() {
		const { value, options } = this.props;
		return options.enumOptions
			.filter(option => value.indexOf(option.value) < 0)
			.filter(item => item.label.toUpperCase().indexOf(this.state.filterText.toUpperCase()) > -1);
	}

	getDropdownItems(suggestions) {
		if (this.withCategory) {
			const items = [];
			const itemsMap = {};
			const groupBy = this.props.options.groupBy;

			suggestions.forEach(item => {
				itemsMap[item[groupBy]] = itemsMap[item[groupBy]] || [];
				itemsMap[item[groupBy]].push({ ...item, title: item.label });
			});

			Object.keys(itemsMap).forEach(category => {
				items.push({ title: category, suggestions: itemsMap[category] });
			});
			return items;
		} else if (suggestions && suggestions.length > 0) {
			return suggestions.map(item => ({ ...item, title: item.label }));
		}
		return suggestions;
	}

	updateSuggestions(value, props) {
		this.setState(prevState => {
			const filterText = value === undefined ? prevState.filterText : value;
			const currentProps = props || this.props;

			let suggestions = filterOptions(currentProps);

			if (filterText) {
				const escapedValue = escapeRegexCharacters(filterText.trim());
				const regex = new RegExp(escapedValue, 'i');
				suggestions = suggestions.filter(item => regex.test(item.label));
				if (suggestions.length === 0 && currentProps.schema.createIfNoneMatch) {
					suggestions.push({ label: `${filterText} (new)`, value: filterText });
				}
			}

			return {
				items: this.getDropdownItems(suggestions),
				suggestions,
				focusedItemIndex: suggestions.length ? 0 : undefined,
				focusedSectionIndex: this.withCategory && suggestions.length ? 0 : undefined,
				filterText,
			};
		});
	}

	resetSuggestions() {
		this.setState({
			items: undefined,
			suggestions: undefined,
			focusedItemIndex: undefined,
			focusedSectionIndex: undefined,
			filterText: '',
		});
	}

	scrollDropDownIfRequired({ itemIndex, sectionIndex }, direction) {
		const itemsContainer = this.component.querySelector('.items-container');
		const scrollPosition = itemsContainer.scrollTop;
		const itemsContainerHeight = itemsContainer.clientHeight;
		let itemStart;
		if (sectionIndex === null) {
			itemStart = itemIndex * DROP_DOWN_ITEM_HEIGHT;
		} else {
			itemStart = this.state.items.reduce((acc, item, index) => {
				if (index < sectionIndex) {
					return acc + (item.suggestions.length + 1) * DROP_DOWN_ITEM_HEIGHT;
				} else if (index === sectionIndex) {
					return acc + (itemIndex + 1) * DROP_DOWN_ITEM_HEIGHT;
				}
				return acc;
			}, 0);
		}
		const itemEnd = itemStart + DROP_DOWN_ITEM_HEIGHT;
		if (direction === keycode.codes.down) {
			if (itemStart < scrollPosition) {
				itemsContainer.scrollTop = itemStart;
			}
			if (itemEnd > scrollPosition + itemsContainerHeight) {
				itemsContainer.scrollTop = itemEnd - itemsContainerHeight;
			}
		}
		if (direction === keycode.codes.up) {
			if (itemStart > scrollPosition + itemsContainerHeight) {
				itemsContainer.scrollTop = itemEnd - itemsContainerHeight;
			}
			if (itemStart < scrollPosition) {
				itemsContainer.scrollTop = itemStart;
			}
		}
	}

	render() {
		const { value, readonly, options, id, noAvailableMessage } = this.props;
		const valueToLabel = mapValueToLabel(transformOptions(options));
		let badgeValue;
		let badgeProps;

		return (
			<div className="dropdown" ref={component => this.setComponentRef(component)}>
				<button
					onClick={this.onCaretClick}
					className={classNames(theme['dropdown-toggle'], 'dropdown-toggle')}
				>
					<span className="caret" />
				</button>
				<div className={`${theme.wrapper} form-control`}>
					{value.map((val, index) => {
						badgeValue = valueToLabel[val] || val;
						if (typeof badgeValue === 'string') {
							badgeProps = { label: badgeValue, key: index };
						} else {
							badgeProps = {
								...badgeValue,
								key: index,
								selected: !!badgeValue[options.groupBy],
							};
						}
						if (!readonly) {
							badgeProps.onDelete = () => this.onRemoveTag(val);
						}
						return <Badge {...badgeProps} />;
					})}
					<Typeahead
						id={id}
						autoFocus={false}
						focusedItemIndex={this.state.focusedItemIndex}
						focusedSectionIndex={this.state.focusedSectionIndex}
						value={this.state.filterText}
						items={this.state.items}
						onFocus={this.onFocus}
						onKeyDown={this.onKeyDown}
						onBlur={this.resetSuggestions}
						onChange={this.onChange}
						onSelect={this.onSelect}
						multiSection={this.withCategory}
						theme={this.theme}
						noResultText={noAvailableMessage}
						readOnly={readonly}
					/>
				</div>
			</div>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	MultiSelectTagWidget.propTypes = {
		id: PropTypes.string,
		value: PropTypes.array, //eslint-disable-line
		options: PropTypes.shape({
			enumOptions: PropTypes.array,
			groupBy: PropTypes.string,
		}),
		readonly: PropTypes.bool,
		onChange: PropTypes.func,
		schema: PropTypes.object.isRequired, //eslint-disable-line
		noAvailableMessage: PropTypes.string,
	};
}

export default MultiSelectTagWidget;
