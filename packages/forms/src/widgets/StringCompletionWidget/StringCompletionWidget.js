import React, { PropTypes } from 'react';
import Typeahead from 'react-talend-components/lib/Typeahead';

class StringCompletionWidget extends React.Component {

	static propTypes = {
		options: PropTypes.shape({
			multiSection: PropTypes.bool,
			itemsSrc: PropTypes.string,
		}).isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func,
		formContext: PropTypes.shape({
			fetchItems: PropTypes.func.isRequired,
		}),
	}

	constructor(props) {
		super(props);
		this.state = {};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleFocus() {
		if (this.props.formContext.fetchItems) {
			this.setState({ items: this.props.formContext.fetchItems(this.props.options.itemsSrc) });
		}
	}

	handleSelect(event, { sectionIndex, itemIndex }) {
		if (sectionIndex) {
			this.props.onChange(this.state.items[sectionIndex].suggestions[itemIndex].title);
		}
		this.props.onChange(this.state.items[itemIndex].title);
	}

	handleBlur() {
		if (this.state.items && this.state.items.length > 0) {
			this.setState({ items: null });
		}
	}

	render() {
		return (
			<Typeahead
				items={this.state.items}
				value={this.props.value || ''}
				multiSection={this.props.options.multiSection}
				onChange={change => this.props.onChange(change.target.value)}
				onKeyDown={this.handleFocus}
				onBlur={this.handleBlur}
				onSelect={this.handleSelect}
			/>
		);
	}
}

export default StringCompletionWidget;
