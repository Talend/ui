import PropTypes from 'prop-types';
import React from 'react';
import Badge from '@talend/react-components/lib/Badge';
import { TextMode as FieldTemplate } from '@talend/react-forms/lib/UIForm/fields/FieldTemplate';
import VirtualizedList from '@talend/react-components/lib/VirtualizedList';
import { getRowData } from '@talend/react-components/lib/VirtualizedList/utils/gridrow';

function renderItem(props) {
	const item = getRowData(props.parent, props.index);
	return <Badge style={props.style} key={props.index} label={item.name} selected />;
}
renderItem.height = 35;
renderItem.propTypes = {
	parent: PropTypes.object,
	style: PropTypes.object,
	index: PropTypes.number,
};

export default function MultiSelectTextMode(props) {
	const names = props.resolveName(props.value);
	const titleMap = props.value.map((nextVal, index) => ({
		name: names[index],
		value: nextVal,
	}));
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
		resolveName: PropTypes.func,
		schema: PropTypes.shape({
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}).isRequired,
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

MultiSelectTextMode.defaultProps = {
	value: [],
	itemViewRender: renderItem,
	resolveName: value => value,
};
