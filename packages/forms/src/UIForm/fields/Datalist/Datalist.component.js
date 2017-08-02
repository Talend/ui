import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Typeahead from 'react-talend-components/lib/Typeahead';
import Emphasis from 'react-talend-components/lib/Emphasis';
import FieldTemplate from '../FieldTemplate';

import theme from './Datalist.scss';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderDatalistItem(item, { value }) {
	return (
		<div className={classNames(theme.item, 'datalist-item')}>
			<Emphasis value={value} text={item} />
		</div>
	);
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
			//containerOpen: theme['container-open'],
			//highlight: theme['highlight-match'],
			//input: theme['typeahead-input'],
			//itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};

		this.state = { value: props.value };
	}

	onBlur(event) {
		console.log('OnBlur', arguments);
		//this.setState({ suggestions: undefined });
	}

	onChange(event) {
		console.log('OnChange', arguments);
	}

	onFocus(event) {
		this.updateSuggestions(this.state.value);
	}

	onKeyDown(event) {
		console.log('onKeyDown', arguments);
	}

	onSelect(event) {
		console.log('OnSelect', arguments);
	}

	setValue() {

	}

	updateSuggestions(value) {
		let suggestions = this.props.schema.titleMap.map(item => item.value);
		if (value) {
			const regex = escapeRegexCharacters(value.trim());
			suggestions = suggestions.filter(itemValue => regex.test(itemValue));
		}

		this.setState({ suggestions });
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

Datalist.defaultProps = {};

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
