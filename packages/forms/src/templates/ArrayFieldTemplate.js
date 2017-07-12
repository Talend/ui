import React from 'react';

import { Icon, IconsProvider } from 'react-talend-components';

import theme from './ArrayFieldTemplate.scss';

function ArrayFieldTemplate(props) {
	const { items, canAdd, onAddClick } = props;
	return (
		<div className={theme.ArrayFieldTemplate}>
			<IconsProvider />
			{items &&
				items.map(element =>
					<div className={theme.arrayElement}>
						{!element.itemData.isClosed &&
							<div className={theme.control}>
								<button
									className={theme.delete}
									onClick={element.onDropIndexClick(element.index)}
								>
									<Icon name="talend-trash" />
								</button>
								{element.hasMoveUp &&
									<button
										onClick={element.onReorderClick(
											element.index,
											element.index - 1,
										)}
									>
										<Icon name="talend-caret-down" transform="flip-vertical" />
									</button>}
								{element.hasMoveDown &&
									<button
										onClick={element.onReorderClick(
											element.index,
											element.index + 1,
										)}
									>
										<Icon name="talend-caret-down" />
									</button>}
							</div>}
						<div className={theme.element}>
							{element.children}
						</div>
					</div>,
				)}
			{canAdd && <button className="btn btn-info" type="button" onClick={onAddClick} >NEW ELEMENT</button>}
		</div>
	);
}

export default ArrayFieldTemplate;
