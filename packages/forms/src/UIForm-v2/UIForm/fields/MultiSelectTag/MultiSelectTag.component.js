import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import get from 'lodash/get';
import Typeahead from '@talend/react-components/lib/Typeahead';
import Badge from '@talend/react-components/lib/Badge';
import FocusManager from '@talend/react-components/lib/FocusManager';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

import theme from './MultiSelectTag.scss';
import callTrigger from '../../trigger';

function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getNewItemText(value) {
	return `${value} (new)`;
}

function getLabel(titleMap, value, defaultName) {
	const itemConf = titleMap.find(item => item.value === value);
	if (itemConf) {
		return itemConf.name;
	}
	return defaultName || value;
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
		this.onTrigger = this.onTrigger.bind(this);
		this.resetSuggestions = this.resetSuggestions.bind(this);
	}

	/**
	 * On Tags value change, we update suggestions if they are displayed
	 * @param { Object } nextProps The new props
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
	 * @param { object } event
	 * @param { number } highlightedItemIndex
	 * @param { number } newHighlightedItemIndex
	 */
	onKeyDown(event, { highlightedItemIndex, newHighlightedItemIndex }) {
		switch (event.which) {
			case keycode.codes.enter:
				event.preventDefault();
				// suggestions are displayed and an item has the focus : we select it
				if (Number.isInteger(highlightedItemIndex)) {
					this.onAddTag(event, { itemIndex: highlightedItemIndex });
				}
				break;
			case keycode.codes.down:
			case keycode.codes.up:
				event.preventDefault();
				this.setState({ focusedItemIndex: newHighlightedItemIndex });
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
	 * @param { object } event The input change event
	 * @param { string } value The new input value
	 */
	onChange(event, { value }) {
		this.updateSuggestions(value);
	}

	onTrigger(event, trigger) {
		return this.props.onTrigger(event, {
			trigger,
			schema: this.props.schema,
			errors: this.props.errors,
			properties: this.props.properties,
		});
	}

	/**
	 * Update suggestions on input focus
	 */
	onFocus(event) {
		this.updateSuggestions();

		callTrigger(event, {
			eventNames: [event.type],
			triggersDefinitions: this.props.schema.triggers,
			onTrigger: this.onTrigger,
			onLoading: isLoading => this.setState({ isLoading }),
			onResponse: data => this.setState(data),
		}).then(() => this.updateSuggestions());
	}

	/**
	 * Add a new tag
	 * @param { object } event The user event
	 * @param { number } itemIndex The selected suggestion index
	 */
	onAddTag(event, { itemIndex }) {
		const currentValue = this.state.value;
		const selectedOption = this.state.suggestions[itemIndex].value;
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
	 * @param { object } event The user event
	 * @param { number } itemIndex The tag index
	 */
	onRemoveTag(event, itemIndex) {
		const value = this.props.value.slice(0);
		value.splice(itemIndex, 1);
		const payload = { schema: this.props.schema, value };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	/**
	 * Resolve the title map.
	 * The dummy version is that it's provided in schema. But with async titleMap loading,
	 * we store them in state.
	 * If we have something in state, it means that it comes from async load,
	 * considered as more important that schema.
	 * @param props
	 * @returns {*|Array}
	 */
	getTitleMap(props) {
		return this.state.titleMap || get(props, 'schema.titleMap') || this.props.schema.titleMap || [];
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
	 * @param { string } value The new input value. If not provided, it uses the current input value.
	 * @param { object } props The props to use. If not provided, it uses this.props.
	 */
	updateSuggestions(value, props) {
		this.setState(oldState => {
			const currentValue = value === undefined ? oldState.value : value;
			const currentProps = props === undefined ? this.props : props;
			let suggestions = this.getTitleMap(currentProps)
				.map(item => ({ value: item.value, title: item.name }))
				.filter(item => !currentProps.value.includes(item.value));

			if (currentValue) {
				const escapedValue = escapeRegexCharacters(currentValue.trim());
				const exactMatchRx = new RegExp(`^${escapedValue}$`, 'i');
				const similarValueRx = new RegExp(escapedValue, 'i');
				suggestions = suggestions.filter(item => similarValueRx.test(item.title));
				if (
					!suggestions.some(item => exactMatchRx.test(item.title)) &&
					currentProps.schema.restricted === false &&
					!currentProps.value.includes(currentValue)
				) {
					suggestions.push({ value: currentValue, title: getNewItemText(currentValue) });
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
		const { id, isValid, errorMessage, schema, valueIsUpdating } = this.props;
		const names = this.props.resolveName(this.props.value);
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={errorMessage}
				id={id}
				isValid={isValid}
				label={schema.title}
				required={schema.required}
				valueIsUpdating={valueIsUpdating}
			>
				<div className={`${theme.wrapper} form-control`}>
					{this.props.value.map((val, index) => {
						const label = getLabel(this.getTitleMap(), val, names[index]);
						const badgeProps = { label, key: index };
						if (!schema.readOnly && !schema.disabled) {
							badgeProps.onDelete = event => this.onRemoveTag(event, index);
						}
						return <Badge {...badgeProps} />;
					})}
					<FocusManager onFocusOut={this.resetSuggestions} className={theme['focus-manager']}>
						<Typeahead
							id={id}
							autoFocus={schema.autoFocus || false}
							disabled={schema.disabled || valueIsUpdating}
							focusedItemIndex={this.state.focusedItemIndex}
							isLoading={this.state.isLoading}
							items={this.state.suggestions}
							multiSection={false}
							onChange={this.onChange}
							onFocus={this.onFocus}
							onKeyDown={this.onKeyDown}
							onSelect={this.onAddTag}
							placeholder={schema.placeholder}
							readOnly={schema.readOnly || false}
							theme={this.theme}
							value={this.state.value}
							caret
							inputProps={{
								'aria-invalid': !isValid,
								'aria-required': schema.required,
								'aria-describedby': `${descriptionId} ${errorId}`,
							}}
						/>
					</FocusManager>
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
		errors: PropTypes.object,
		resolveName: PropTypes.func,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onTrigger: PropTypes.func.isRequired,
		properties: PropTypes.object,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			restricted: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
			triggers: PropTypes.arrayOf(
				PropTypes.shape({
					onEvent: PropTypes.string,
				}),
			),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
		valueIsUpdating: PropTypes.bool,
	};
}

MultiSelectTag.defaultProps = {
	isValid: true,
	resolveName: value => value,
	schema: {},
	value: [],
};
