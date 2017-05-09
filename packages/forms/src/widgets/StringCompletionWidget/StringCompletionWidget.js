import React, { PropTypes } from 'react';
import Typeahead from 'react-talend-components/lib/Typeahead';

function handleSelect(items, onChange) {
	return function onSelect(event, { sectionIndex, itemIndex }) {
		onChange(items[sectionIndex].suggestions[itemIndex].title);
	};
}

function StringCompletionWidget(props) {
	let items = [];
	if (props.options.itemsSrc) {
		items = props.formContext.fetchItems(props.options.itemsSrc);
	}
	return (
		<Typeahead
			items={items}
			value={props.value || ''}
			onChange={change => props.onChange(change.target.value)}
			onSelect={handleSelect(items, props.onChange)}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	StringCompletionWidget.propTypes = {
		options: PropTypes.shape({
			itemsSrc: PropTypes.string,
		}).required,
		value: PropTypes.string,
		onChange: PropTypes.func,
		formContext: PropTypes.shape({
			fetchItems: PropTypes.func.required,
		}),
	};
}

export default StringCompletionWidget;
