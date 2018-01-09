import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';

import Icon from '@talend/react-components/lib/Icon';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

import theme from './ArrayFieldTemplate.scss';

function FieldTemplate({ element, cantDelete }) {
	const arrayElement = classNames(theme.arrayElement, element.itemData.isClosed && theme.closed);
	return (
		<div className={arrayElement}>
			{
				<div className={theme.control}>
					<button
						type="button"
						name={`btn-delete-element-${element.index}`}
						disabled={cantDelete}
						className={theme.delete}
						onClick={element.onDropIndexClick(element.index)}
						title="Delete"
					>
						<Icon name="talend-trash" />
					</button>
					{!element.itemData.isClosed && (
						<div className={theme.orderaction}>
							<button
								type="button"
								name={`btn-move-element-up-${element.index}`}
								disabled={!element.hasMoveUp}
								onClick={element.onReorderClick(element.index, element.index - 1)}
								title="Move Up"
							>
								<Icon name="talend-caret-down" transform="flip-vertical" />
							</button>
							<button
								type="button"
								name={`btn-move-element-down-${element.index}`}
								disabled={!element.hasMoveDown}
								onClick={element.onReorderClick(element.index, element.index + 1)}
								title="Move Down"
							>
								<Icon name="talend-caret-down" />
							</button>
						</div>
					)}
				</div>
			}
			<div className={theme.element}>{element.children}</div>
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
	const { items, canAdd, onAddClick, minItems, maxItems } = props;
	const addBtnClass = classNames(theme.addBtn, 'btn', 'btn-info');
	return (
		<StickyContainer>
			<div className={theme.ArrayFieldTemplate}>
				<IconsProvider />
				{canAdd &&
					<Sticky>
						{({ style }) => <div style={style}><button
							className={addBtnClass}
							type="button"
							name="btn-new-element"
							disabled={items.length >= maxItems}
							onClick={onAddClick}
						>
							{`NEW ${props.type}`}
						</button>
						</div>}
					</Sticky>
				}
				{items &&
					items.map(element =>
						<FieldTemplate element={element} cantDelete={items.length <= minItems} />
					)}
			</div>
		</StickyContainer>
	);
}
if (process.env.NODE_ENV !== 'production') {
	ArrayFieldTemplate.propTypes = {
		type: PropTypes.string.isRequired,
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		canAdd: PropTypes.func.isRequired,
		onAddClick: PropTypes.func.isRequired,
		minItems: PropTypes.number.isRequired,
		maxItems: PropTypes.number.isRequired,
	};
}
export default ArrayFieldTemplate;
