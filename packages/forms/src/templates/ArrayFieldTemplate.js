import React, { PropTypes } from 'react';

import { Icon, IconsProvider } from 'react-talend-components';

import theme from './ArrayFieldTemplate.scss';

function FieldTemplate({ element }) {
	return (
		<div className={theme.arrayElement}>
			{!element.itemData.isClosed &&
				<div className={theme.control}>
					<button
						className={theme.delete}
						onClick={element.onDropIndexClick(element.index)}
						title="Delete"
					>
						<Icon name="talend-trash" />
					</button>
					<button
						disabled={!element.hasMoveUp}
						onClick={element.onReorderClick(element.index, element.index - 1)}
						title="Move Up"
					>
						<Icon name="talend-caret-down" transform="flip-vertical" />
					</button>
					<button
						disabled={!element.hasMoveDown}
						onClick={element.onReorderClick(element.index, element.index + 1)}
						title="Move Down"
					>
						<Icon name="talend-caret-down" />
					</button>
				</div>}
			<div className={theme.element}>
				{element.children}
			</div>
		</div>
	);
}
if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		element: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
	};
}

function ArrayFieldTemplate(props) {
	const { items, canAdd, onAddClick, maxItems } = props;
	return (
		<div className={theme.ArrayFieldTemplate}>
			<IconsProvider />
			{items && items.map(element => <FieldTemplate element={element} />)}
			{canAdd && items.length < maxItems &&
				<button className="btn btn-info" type="button" onClick={onAddClick}>
					NEW ELEMENT
				</button>}
		</div>
	);
}
if (process.env.NODE_ENV !== 'production') {
	ArrayFieldTemplate.propTypes = {
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		canAdd: PropTypes.func.isRequired,
		onAddClick: PropTypes.func.isRequired,
		maxItems: PropTypes.number,
	};
}
export default ArrayFieldTemplate;
