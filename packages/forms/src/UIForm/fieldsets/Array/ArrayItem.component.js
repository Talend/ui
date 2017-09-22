import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from '@talend/react-components';
import classNames from 'classnames';

import theme from './ArrayItem.scss';

export default function ArrayItem(props) {
	const {
		children,
		hasMoveDown,
		hasMoveUp,
		id,
		index,
		onRemove,
		onReorder,
		value,
	} = props;

	return (
		<div className={classNames(theme['tf-array-item'], 'tf-array-item')} >
			{
				!value.isClosed &&
				<div className={theme.control}>
					<button
						className={theme.delete}
						id={id && `${id}-delete`}
						onClick={event => onRemove(event, index)}
						title="Delete"
						type="button"
					>
						<Icon name="talend-trash" />
					</button>
					<button
						disabled={!hasMoveUp}
						id={id && `${id}-moveUp`}
						onClick={event => onReorder(event, { previousIndex: index, nextIndex: index - 1 })}
						title="Move Up"
						type="button"
					>
						<Icon name="talend-caret-down" transform="flip-vertical" />
					</button>
					<button
						disabled={!hasMoveDown}
						id={id && `${id}-moveDown`}
						onClick={event => onReorder(event, { previousIndex: index, nextIndex: index + 1 })}
						type="button"
						title="Move Down"
					>
						<Icon name="talend-caret-down" />
					</button>
				</div>
			}
			{children}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ArrayItem.propTypes = {
		children: PropTypes.node,
		hasMoveDown: PropTypes.bool.isRequired,
		hasMoveUp: PropTypes.bool.isRequired,
		id: PropTypes.string,
		index: PropTypes.number.isRequired,
		onRemove: PropTypes.func.isRequired,
		onReorder: PropTypes.func.isRequired,
		value: PropTypes.func.isRequired,
	};
}
