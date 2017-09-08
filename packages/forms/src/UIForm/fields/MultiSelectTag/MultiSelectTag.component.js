import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import Typeahead from 'react-talend-components/lib/Typeahead';
import FieldTemplate from '../FieldTemplate';
import Tags from './Tags.component';

import theme from './MultiSelectTagWidget.scss';

const INPUT_TEXT_INDENT = 7.5;
const TAGS_HEIGHT = 28;
const TAGS_MARGIN_TOP = 5;
const INPUT_MIN_WIDTH = 135;

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getNewItemText(value) {
	return `${value} (new)`;
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
		this.onInputMount = this.onInputMount.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onRemoveTag = this.onRemoveTag.bind(this);
		this.onAddTag = this.onAddTag.bind(this);
		this.onTagsMount = this.onTagsMount.bind(this);
		this.resetSuggestions = this.resetSuggestions.bind(this);
	}

	/**
	 * Update input spacing on mount
	 */
	componentDidMount() {
		this.updateSpaces();
	}

	/**
	 * On Tags value change
	 * - Update input spacing
	 * - Update suggestions if they are displayed
	 * @param value The tags values
	 */
	componentDidUpdate({ value }) {
		if (!this.input || !this.tags || value === this.props.value) {
			return;
		}
		this.updateSpaces();
		if (this.state.suggestions) {
			this.updateSuggestions();
		}
	}

	/**
	 * Save input ref
	 * @param input The input ref
	 */
	onInputMount(input) {
		this.input = input;
	}

	/**
	 * Save tags list ref
	 * @param tags The tags list ref
	 */
	onTagsMount(tags) {
		this.tags = tags;
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
			if (!this.state.suggestions) {
				break;
			}
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
	 * Add spaces on input to place it after the tags
	 */
	updateSpaces() {
		if (this.props.value.length) {
			const lastTag = this.tags.querySelector('div.tc-badge:last-child');
			const paddingLeft = lastTag.offsetLeft + lastTag.offsetWidth + INPUT_TEXT_INDENT;
			let paddingTop = lastTag.offsetTop - TAGS_MARGIN_TOP;
			const toNextLine = (this.input.offsetWidth - paddingLeft) < INPUT_MIN_WIDTH;
			if (toNextLine) {
				paddingTop += TAGS_HEIGHT;
				this.input.style.paddingLeft = '0px';
			} else {
				this.input.style.paddingLeft = `${paddingLeft}px`;
			}
			this.input.style.marginTop = `${paddingTop}px`;
		} else {
			this.input.style.paddingLeft = '0px';
			this.input.style.paddingTop = '0px';
		}
	}

	/**
	 * Update suggestions
	 * - remove current tags values
	 * - filter based on input value
	 * @param value The new input value. Undefined if we should use the current input value.
	 */
	updateSuggestions(value) {
		const currentValue = value === undefined ? this.state.value : value;
		let suggestions = this.props.schema.titleMap
			.map(item => item.value)
			.filter(item => this.props.value.indexOf(item) < 0);

		if (currentValue) {
			const escapedValue = escapeRegexCharacters(currentValue.trim());
			const regex = new RegExp(escapedValue, 'i');
			suggestions = suggestions.filter(itemValue => regex.test(itemValue));

			if (!suggestions.length && this.props.schema.restricted === false) {
				suggestions.push(getNewItemText(currentValue));
			}
		}

		this.setState({
			focusedItemIndex: suggestions.length ? 0 : undefined,
			suggestions,
			value: currentValue,
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
				<div className={theme.wrapper}>
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
						inputRef={this.onInputMount}
						onKeyDown={this.onKeyDown}
						onSelect={this.onAddTag}
						placeholder={schema.placeholder}
						readOnly={schema.readOnly || false}
						theme={this.theme}
						value={this.state.value}
					/>
					<div className={theme.caret}>
						<span className="caret" />
					</div>
					<Tags
						onRemoveTag={this.onRemoveTag}
						onTagsMount={this.onTagsMount}
						readonly={schema.readOnly || schema.disabled}
						titleMap={schema.titleMap}
						value={this.props.value}
					/>
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
