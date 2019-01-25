import PropTypes from 'prop-types';
import React from 'react';
import Badge from '@talend/react-components/lib/Badge';
import { TextMode as FieldTemplate } from '@talend/react-forms/lib/UIForm/fields/FieldTemplate';
import VirtualizedList from '@talend/react-components/lib/VirtualizedList';

import theme from './TextMode.scss';
import getTitleMap from '../getTitleMap';

function renderItem(props) {
	const item = props.parent.props.collection[props.index];
	return (
		<Badge
			className={theme.badge}
			style={props.style}
			key={props.index}
			label={item.name}
			selected
		/>
	);
}
renderItem.height = 35;
renderItem.propTypes = {
	parent: PropTypes.object,
	style: PropTypes.object,
	index: PropTypes.number,
};

export default function MultiSelectTextMode(props) {
	const titleMap = getTitleMap(props);
	return (
		<FieldTemplate id={props.id} label={props.schema.title}>
			<div style={{ height: 300 }}>
				<VirtualizedList
					type="tc-multiselect"
					rowHeight={props.itemViewRender.rowHeight}
					rowRenderers={{ 'tc-multiselect': props.itemViewRender }}
					collection={titleMap}
				/>
			</div>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	MultiSelectTextMode.propTypes = {
		itemViewRender: PropTypes.func,
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}).isRequired,
	};
}

MultiSelectTextMode.defaultProps = {
	value: [],
	itemViewRender: renderItem,
};
