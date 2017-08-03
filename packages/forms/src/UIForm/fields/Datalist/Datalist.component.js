import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import Typeahead from 'react-talend-components/lib/Typeahead';
import FieldTemplate from '../FieldTemplate';

import theme from './Datalist.scss';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onSelect = this.onSelect.bind(this);

		this.theme = {
			container: classNames(
				theme.container,
				'tf-datalist-container'
			),
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};

		this.state = { previousValue: props.value, value: props.value };
	}

	onBlur(event) {
		this.resetSuggestions();
		const { value, previousValue } = this.state;

		if (value !== previousValue) {
			this.updateValue(event, value, true);
		}
	}

	onChange(event, { value }) {
		this.updateSuggestions(value);
		this.updateValue(event, value, false);
	}

	onFocus() {
		this.updateSuggestions(this.state.value);
	}

	onKeyDown(event, { focusedItemIndex, newFocusedItemIndex }) {
		switch (event.which) {
		case keycode.codes.esc:
			event.preventDefault();
			this.resetValue();
			break;
		case keycode.codes.enter:
			if (!this.state.suggestions) {
				break;
			}

			event.preventDefault();
			if (Number.isInteger(focusedItemIndex)) {
				// enum is displayed and an item has the focus : we select it
				this.onSelect(event, { itemIndex: focusedItemIndex });
			} else if (this.state.value !== this.state.previousValue) {
				// there is no focused item : we set the value
				this.updateValue(event, this.state.value, true);
			}
			this.resetSuggestions();
			break;
		case keycode.codes.up:
		case keycode.codes.down:
			event.preventDefault();
			this.setState({ focusedItemIndex: newFocusedItemIndex });
			break;
		default:
			break;
		}
	}

	onSelect(event, { itemIndex }) {
		const newValue = this.state.suggestions[itemIndex];
		this.updateValue(event, newValue, true);
	}

	updateValue(event, value, persist) {
		/*
		const { restricted, titleMap } = this.props.schema;
		const restrictedValueIsCorrect =
			!restricted ||                               // value is not restricted
			!value ||                                    // value is empty
			titleMap.find(item => item.value === value); // value is in possible values

		if (persist && !restrictedValueIsCorrect) {
			this.resetValue();
		} else {
			const previousValue = persist ? value : this.state.previousValue;
			this.setState({ value, previousValue });
			if (persist) {
				this.props.onChange(event, {
					schema: this.props.schema,
					value,
				});
			}
		}
		*/

		const previousValue = persist ? value : this.state.previousValue;
		this.setState({ value, previousValue });
		if (persist) {
			this.props.onChange(event, {
				schema: this.props.schema,
				value,
			});
		}
	}

	resetValue() {
		this.setState({
			suggestions: undefined,
			value: this.state.previousValue,
		});
	}

	updateSuggestions(value) {
		let suggestions = this.props.schema.titleMap.map(item => item.value);
		if (value) {
			const escapedValue = escapeRegexCharacters(value.trim());
			const regex = new RegExp(escapedValue, 'i');
			suggestions = suggestions.filter(itemValue => regex.test(itemValue));
		}

		this.setState({ suggestions });
	}

	resetSuggestions() {
		this.setState({
			suggestions: undefined,
			focusedItemIndex: undefined,
		});
	}

	render() {
		return (
			<FieldTemplate
				description={this.props.schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={this.props.schema.title}
			>
				<div className={theme['tf-datalist']}>
					<Typeahead
						id={this.props.id}
						autoFocus={this.props.schema.autoFocus}
						focusedItemIndex={this.state.focusedItemIndex}
						items={this.state.suggestions}
						multiSection={false}
						onBlur={this.onBlur}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onKeyDown={this.onKeyDown}
						onSelect={this.onSelect}
						theme={this.theme}
						value={this.state.value}
					/>
					<div className={theme.toggle}>
						<span className="caret" />
					</div>
				</div>
			</FieldTemplate>
		);
	}
}

Datalist.defaultProps = {
	value: '',
};

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
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
			type: PropTypes.string,
		}),
		value: PropTypes.string,
	};
}

export default Datalist;
