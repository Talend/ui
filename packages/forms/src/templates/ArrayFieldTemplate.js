import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from '@talend/react-components/lib/Icon';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

import theme from './ArrayFieldTemplate.scss';

function FieldTemplate({ element, cantDelete }) {
	const elementClasses = classNames(theme.element, element.itemData.isClosed && theme.closed);
	return (
		<div className={theme.arrayElement}>
			<div className={theme.control}>
				<button
					type="button"
					name={`btn-move-element-up-${element.index}`}
					disabled={!element.hasMoveUp}
					onClick={element.onReorderClick(element.index, element.index - 1)}
					title="Move Up"
				>
					<Icon name="talend-arrow-left" transform="rotate-90" />
				</button>
				<button
					type="button"
					name={`btn-move-element-down-${element.index}`}
					disabled={!element.hasMoveDown}
					onClick={element.onReorderClick(element.index, element.index + 1)}
					title="Move Down"
				>
					<Icon name="talend-arrow-left" transform="rotate-270" />
				</button>
			</div>
			<div className={elementClasses}>{element.children}</div>
			<div className={theme.control}>
				<button
					type="button"
					name={`btn-delete-element-${element.index}`}
					disabled={cantDelete}
					className={theme.delete}
					onClick={element.onDropIndexClick(element.index)}
					title="Delete"
				>
					<Icon name="talend-cross" />
				</button>
			</div>
		</div>
	);
}
if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		element: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		cantDelete: PropTypes.bool.isRequired,
	};
}

function ArrayFieldTemplate(props) {
	const { items, canAdd, onAddClick, minItems, maxItems, title } = props;
	const addBtnClass = classNames(theme.addBtn, 'btn', 'btn-info');
	return (
		<fieldset className={`${theme.ArrayFieldTemplate} ArrayFieldTemplate`} data-content={title}>
			{title && <legend>{title}</legend>}
			<IconsProvider />
			{canAdd && (
				<button
					className={addBtnClass}
					type="button"
					name="btn-new-element"
					disabled={items.length >= maxItems}
					onClick={onAddClick}
				>
					{`NEW ${props.type}`}
				</button>
			)}
			{items &&
				items.map(element => (
					<FieldTemplate element={element} cantDelete={items.length <= minItems} />
				))}
		</fieldset>
	);
}
if (process.env.NODE_ENV !== 'production') {
	ArrayFieldTemplate.propTypes = {
		type: PropTypes.string.isRequired,
		title: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		canAdd: PropTypes.func.isRequired,
		onAddClick: PropTypes.func.isRequired,
		minItems: PropTypes.number.isRequired,
		maxItems: PropTypes.number.isRequired,
	};
}
export default ArrayFieldTemplate;
