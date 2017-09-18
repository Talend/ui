import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import Typeahead from 'react-talend-components/lib/Typeahead';
import Badge from 'react-talend-components/lib/Badge';
import FieldTemplate from '../FieldTemplate';

import theme from './MultiSelectTag.scss';

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getNewItemText(value) {
	return `${value} (new)`;
}

function getLabel(titleMap, value) {
	const itemConf = titleMap.find(item => item.value === value);
	if (itemConf) {
		return itemConf.name;
	}
	return value;
}

export default class MultiSelectTag extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.theme = {
			container: theme.typeahead,
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};

		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onRemoveTag = this.onRemoveTag.bind(this);
		this.onAddTag = this.onAddTag.bind(this);
		this.resetSuggestions = this.resetSuggestions.bind(this);
	}

	/**
	 * On Tags value change, we update suggestions if they are displayed
	 * @param nextProps The new props
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.value === this.props.value) {
			return;
		}
		if (this.state.suggestions) {
			this.updateSuggestions(undefined, nextProps);
		}
	}

	/**
	 * Manage suggestion selection
	 * @param event
	 * @param focusedItemIndex
	 * @param newFocusedItemIndex
	 */
	onKeyDown(event, { focusedItemIndex, newFocusedItemIndex }) {
		switch (event.which) {
		case keycode.codes.enter:
			event.preventDefault();
			// suggestions are displayed and an item has the focus : we select it
			if (Number.isInteger(focusedItemIndex)) {
				this.onAddTag(event, { itemIndex: focusedItemIndex });
			}
			break;
		case keycode.codes.down:
		case keycode.codes.up:
			event.preventDefault();
			this.setState({ focusedItemIndex: newFocusedItemIndex });
			break;
		case keycode.codes.backspace:
			if (!this.state.value && this.props.value.length) {
				this.onRemoveTag(event, this.props.value.length - 1);
			}
			break;
		default:
			break;
		}
	}

	/**
	 * Update suggestions on input value change
	 * @param event The input change event
	 * @param value The new input value
	 */
	onChange(event, { value }) {
		this.updateSuggestions(value);
	}

	/**
	 * Update suggestions on input focus
	 */
	onFocus() {
		this.updateSuggestions();
	}

	/**
	 * Add a new tag
	 * @param event The user event
	 * @param itemIndex The selected suggestion index
	 */
	onAddTag(event, { itemIndex }) {
		const currentValue = this.state.value;
		const selectedOption = this.state.suggestions[itemIndex];
		const isCreation = getNewItemText(currentValue) === selectedOption;

		const newValue = isCreation ? currentValue : selectedOption;
		const payload = {
			schema: this.props.schema,
			value: this.props.value.concat(newValue),
		};
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
		this.updateSuggestions('');
	}

	/**
	 * Remove a tag
	 * @param event The user event
	 * @param itemIndex The tag index
	 */
	onRemoveTag(event, itemIndex) {
		const value = this.props.value.slice(0);
		value.splice(itemIndex, 1);
		const payload = { schema: this.props.schema, value };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	/**
	 * Remove all suggestions
	 */
	resetSuggestions() {
		this.setState({
			suggestions: undefined,
			focusedItemIndex: undefined,
		});
	}

	/**
	 * Update suggestions
	 * - remove current tags values
	 * - filter based on input value
	 * @param value The new input value. Undefined if we should use the current input value.
	 * @param props The props to use. If not provided, it used this.props.
	 */
	updateSuggestions(value, props) {
		this.setState((oldState) => {
			const currentValue = value === undefined ? oldState.value : value;
			const currentProps = props === undefined ? this.props : props;
			let suggestions = currentProps.schema.titleMap
				.map(item => item.value)
				.filter(item => currentProps.value.indexOf(item) < 0);

			if (currentValue) {
				const escapedValue = escapeRegexCharacters(currentValue.trim());
				const regex = new RegExp(escapedValue, 'i');
				suggestions = suggestions.filter(itemValue => regex.test(itemValue));

				if (!suggestions.length && currentProps.schema.restricted === false) {
					suggestions.push(getNewItemText(currentValue));
				}
			}

			return {
				focusedItemIndex: suggestions.length ? 0 : undefined,
				suggestions,
				value: currentValue,
			};
		});
	}

	render() {
		const { id, isValid, errorMessage, schema } = this.props;

		return (
			<FieldTemplate
				description={schema.description}
				errorMessage={errorMessage}
				id={id}
				isValid={isValid}
				label={schema.title}
			>
				<div className={`${theme.wrapper} form-control`}>
					{
						this.props.value.map((val, index) => {
							const label = getLabel(schema.titleMap, val);
							const badgeProps = { label, key: index };
							if (!schema.readOnly && !schema.disabled) {
								badgeProps.onDelete = event => this.onRemoveTag(event, index);
							}
							return (
								<Badge {...badgeProps} />
							);
						})
					}

					<Typeahead
						id={id}
						autoFocus={schema.autoFocus || false}
						disabled={schema.disabled || false}
						focusedItemIndex={this.state.focusedItemIndex}
						items={this.state.suggestions}
						multiSection={false}
						onBlur={this.resetSuggestions}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onKeyDown={this.onKeyDown}
						onSelect={this.onAddTag}
						placeholder={schema.placeholder}
						readOnly={schema.readOnly || false}
						theme={this.theme}
						value={this.state.value}
					/>
					<div className={theme.caret}>
						<span className="caret"/>
					</div>
				</div>
			</FieldTemplate>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	MultiSelectTag.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			restricted: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			})),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

MultiSelectTag.defaultProps = {
	isValid: true,
	schema: {},
	value: [],
};
