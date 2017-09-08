import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Badge from 'react-talend-components/lib/Badge';

import theme from './MultiSelectTagWidget.scss';

function getLabel(titleMap, value) {
	const itemConf = titleMap.find(item => item.value === value);
	return itemConf ? itemConf.name : value;
}

export default function Tags({ onRemoveTag, onTagsMount, readonly, titleMap, value }) {
	return (
		<div
			className={classNames(theme.tags, 'tags')}
			ref={onTagsMount}
		>
			{
				value.map((val, index) => {
					const label = getLabel(titleMap, val);
					const badgeProps = { label, key: index };
					if (!readonly) {
						badgeProps.onDelete = event => onRemoveTag(event, index);
					}
					return (
						<Badge {...badgeProps} />
					);
				})
			}
		</div>
	);
}
if (process.env.NODE_ENV !== 'production') {
	Tags.propTypes = {
		onRemoveTag: PropTypes.func,
		onTagsMount: PropTypes.func,
		readonly: PropTypes.bool,
		titleMap: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.string,
		})).isRequired,
		value: PropTypes.arrayOf(PropTypes.string).isRequired,
	};
}
