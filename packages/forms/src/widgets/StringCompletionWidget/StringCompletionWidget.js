import React, { PropTypes } from 'react';
import Typeahead from 'react-talend-components/lib/Typeahead';
import keycode from 'keycode';

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
		this.state = {
			highlightedSectionIndex: null,
			highlightedItemIndex: null,
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleFocus() {
		if (this.props.formContext.fetchItems) {
			this.setState({ items: this.props.formContext.fetchItems(this.props.options.itemsSrc) });
		}
	}

	handleKeyDown(event, {
		focusedSectionIndex, focusedItemIndex,
		newFocusedSectionIndex, newFocusedItemIndex }) {
		switch (keycode(event)) {
		case 'up':
		case 'down':
			event.preventDefault();
			if (typeof newFocusedItemIndex !== 'undefined') {
				this.setState({
					highlightedItemIndex: newFocusedItemIndex,
					highlightedSectionIndex: newFocusedSectionIndex,
				});
			}
			break;
		case 'enter':
			event.preventDefault();
			this.handleSelect(null, {
				sectionIndex: focusedSectionIndex,
				itemIndex: focusedItemIndex,
			});
			break;
		default:
			return;
		}
	}

	handleSelect(event, { sectionIndex, itemIndex }) {
		if (sectionIndex) {
			this.props.onChange(this.state.items[sectionIndex].suggestions[itemIndex].title);
		}
		this.props.onChange(this.state.items[itemIndex].title);
		this.handleBlur();
	}

	handleBlur() {
		if (this.state.items && this.state.items.length > 0) {
			this.setState({
				items: null,
				highlightedItemIndex: null,
				highlightedSectionIndex: null,
			});
		}
	}

	handleMouseEnter(event, { sectionIndex, itemIndex }) {
		this.setState({
			highlightedItemIndex: itemIndex,
			highlightedSectionIndex: sectionIndex,
		});
	}

	handleMouseLeave() {
		this.setState({
			highlightedItemIndex: null,
			highlightedSectionIndex: null,
		});
	}

	render() {
		return (
			<Typeahead
				autoFocus={false}
				items={this.state.items}
				value={this.props.value || ''}
				multiSection={this.props.options.multiSection}
				onChange={change => this.props.onChange(change.target.value)}
				onFocus={this.handleFocus}
				onKeyDown={this.handleKeyDown}
				onBlur={this.handleBlur}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onSelect={this.handleSelect}
				focusedItemIndex={this.state.highlightedItemIndex}
				focusedSectionIndex={this.state.highlightedSectionIndex}
			/>
		);
	}
}

export default StringCompletionWidget;
