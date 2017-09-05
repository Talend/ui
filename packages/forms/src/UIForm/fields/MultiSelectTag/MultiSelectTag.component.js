import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import Badge from 'react-talend-components/lib/Badge';
import Typeahead from 'react-talend-components/lib/Typeahead';
import FieldTemplate from '../FieldTemplate';

import theme from './MultiSelectTagWidget.scss';

const INPUT_TEXT_INDENT = 7.5;
const INPUT_HEIGHT = 32;
const BADGE_HEIGHT = 24;
const BADGES_MARGIN_TOP = 7;
const INPUT_MIN_WIDTH = 135;

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getNewItemText(value) {
	return `${value} (new)`;
}

function getLabel(titleMap, value) {
	const itemConf = titleMap.find(item => item.value === value);
	return itemConf ? itemConf.name : value;
}

function Tags({ onRemoveTag, onTagsMount, readonly, titleMap, value }) {
	return (
		<div
			className={classNames(theme['tags-container'], 'tags-container')}
			ref={onTagsMount}
		>
			{
				value.map((val, index) => {
					const label = getLabel(titleMap, val);
					const badgeProps = { label, key: index };
					if (!readonly) {
						badgeProps.onDelete = event => onRemoveTag(event, val);
					}
					return (
						<Badge {...badgeProps} />
					);
				})
			}
		</div>
	);
}
if (process.env.NODE_ENV !== 'production') {
	Tags.propTypes = {
		onRemoveTag: PropTypes.func,
		onTagsMount: PropTypes.func,
		readonly: PropTypes.bool,
		titleMap: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.string,
		})).isRequired,
		value: PropTypes.arrayOf(PropTypes.string).isRequired,
	};
}

export default class MultiSelectTag extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onInputMount = this.onInputMount.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onRemoveTag = this.onRemoveTag.bind(this);
		this.onSelectTag = this.onSelectTag.bind(this);
		this.onTagsMount = this.onTagsMount.bind(this);
		this.resetSuggestions = this.resetSuggestions.bind(this);
	}

	onInputMount(input) {
		this.input = input;
	}

	onTagsMount(tags) {
		if (tags && this.input) {
			const lastTag = tags.querySelector('div.tc-badge:last-child');
			if (lastTag) {
				const paddingLeft = lastTag.offsetLeft + lastTag.offsetWidth + INPUT_TEXT_INDENT;
				let paddingTop = lastTag.offsetTop - BADGES_MARGIN_TOP;
				const toNextLine = (this.input.offsetWidth - paddingLeft) < INPUT_MIN_WIDTH;
				if (toNextLine) {
					paddingTop += BADGE_HEIGHT;
					this.input.style.paddingLeft = `${INPUT_TEXT_INDENT}px`;
				} else {
					this.input.style.paddingLeft = `${paddingLeft}px`;
				}
				this.input.style.paddingTop = `${paddingTop}px`;
				this.input.style.height = `${parseInt(this.input.style.paddingTop, 10) + INPUT_HEIGHT}px`;
			} else {
				this.input.style.paddingLeft = '0px';
				this.input.style.paddingTop = '0px';
				this.input.style.height = `${INPUT_HEIGHT}px`;
			}
		}
	}

	onKeyDown(event, { focusedItemIndex, newFocusedItemIndex }) {
		switch (event.which) {
		case keycode.codes.enter:
			if (!this.state.suggestions) {
				break;
			}
			event.preventDefault();
			if (Number.isInteger(focusedItemIndex)) {
				// suggestions are displayed and an item has the focus : we select it
				this.onSelectTag(event, { itemIndex: focusedItemIndex });
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

	onChange(event, { value }) {
		this.updateSuggestions(value);
	}

	onFocus() {
		this.updateSuggestions();
	}

	onSelectTag(event, { itemIndex }) {
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
		this.input.focus();
	}

	onRemoveTag(event, tagValue) {
		const payload = {
			schema: this.props.schema,
			value: this.props.value.filter(val => val !== tagValue),
		};
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	resetSuggestions() {
		this.setState({
			suggestions: undefined,
			focusedItemIndex: undefined,
		});
	}

	updateSuggestions(value = '') {
		let suggestions = this.props.schema.titleMap.map(item => item.value);
		if (value) {
			const escapedValue = escapeRegexCharacters(value.trim());
			const regex = new RegExp(escapedValue, 'i');
			suggestions = suggestions.filter(itemValue => regex.test(itemValue));

			if (!suggestions.length) {
				suggestions.push(getNewItemText(value));
			}
		}

		this.setState({ focusedItemIndex: 0, suggestions, value });
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
				<div className={'lol'}>
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
						onSelect={this.onSelectTag}
						placeholder={schema.placeholder}
						readOnly={schema.readOnly || false}
						value={this.state.value}
					/>
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
