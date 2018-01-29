import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ArrayItem from './ArrayItem.component';

import theme from './Array.scss';

export default function DefaultArrayTemplate(props) {
	const { canReorder, id, onAdd, onRemove, onReorder, renderItem, schema, value } = props;
	return (
		<div>
			{schema.title && <legend>{schema.title}</legend>}
			<ol id={id} className={classNames(theme['tf-array'], 'tf-array')}>
				{value.map((itemValue, index) => (
					<li className={theme.item} key={index}>
						<ArrayItem
							hasMoveDown={index < value.length - 1}
							hasMoveUp={index > 0}
							id={id && `${id}-control-${index}`}
							index={index}
							onRemove={onRemove}
							onReorder={canReorder && onReorder}
							isClosed={itemValue.isClosed}
						>
							{renderItem(index)}
						</ArrayItem>
					</li>
				))}
			</ol>
			<div>
				<button type="button" className="btn btn-info" onClick={onAdd}>
					New Element
				</button>
			</div>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	DefaultArrayTemplate.propTypes = {
		canReorder: PropTypes.bool,
		id: PropTypes.string,
		onAdd: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		renderItem: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
	};
}
