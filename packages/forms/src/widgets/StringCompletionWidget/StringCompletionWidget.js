import React, { PropTypes } from 'react';
import Typeahead from 'react-talend-components/lib/Typeahead';

function handleSelect(items, onChange) {
	return function onSelect(event, { sectionIndex, itemIndex }) {
		if (sectionIndex) {
			onChange(items[sectionIndex].suggestions[itemIndex].title);
		}
		onChange(items[itemIndex].title);
	};
}

function StringCompletionWidget(props) {
	let items = [];
	if (props.formContext.fetchItems) {
		items = props.formContext.fetchItems(props.options.itemsSrc);
	}
	return (
		<Typeahead
			items={items}
			value={props.value || ''}
			multiSection={props.options.multiSection}
			onChange={change => props.onChange(change.target.value)}
			onSelect={handleSelect(items, props.onChange)}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	StringCompletionWidget.propTypes = {
		options: PropTypes.shape({
			multiSection: PropTypes.bool,
			itemsSrc: PropTypes.string,
		}).isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func,
		formContext: PropTypes.shape({
			fetchItems: PropTypes.func.isRequired,
		}),
	};
}

export default StringCompletionWidget;
