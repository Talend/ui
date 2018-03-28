import React from 'react';
// import PropTypes from 'prop-types';
import Model from './Model';
import Records from './Records';

export default function AvroViewer(props) {
	const partStyle = {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 50,
	};
	let avroRenderersIds;
	if (props.useCustomRenderers) {
		avroRenderersIds = this.props.customAvroRenderersIds;
	}
	return (
		<div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
			<div style={partStyle}>
				<Model
					data={props.sample.schema}
					menu={props.modelItemMenu}
					onSelect={props.onSelect}
					quality={{
						key: '@talend-quality@',
						menu: props.qualityMenu,
					}}
				/>
			</div>
			<div style={partStyle}>
				<Records
					avroRenderersIds={avroRenderersIds}
					data={props.sample.data}
					getComponent={props.getComponent}
					highlighted={props.highlighted}
					schema={props.sample.schema}
				/>
			</div>
		</div>
	);
}
