import React from 'react';
import PropTypes from 'prop-types';
import ObjectViewer from '../ObjectViewer';

export default class AvroViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { highlighted: [] };
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, jsonpath) {
		const adaptedJsonPath = jsonpath
			.replace(/[-[{}()*+?.,\\^$|#\s]/g, '\\$&')
			.replace(/\[]/g, '[[0-9]+]');
		this.setState({
			highlighted: [new RegExp(`^${adaptedJsonPath}$`)],
		});
	}

	render() {
		const partStyle = {
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: 50,
		};
		let avroRenderersIds;
		if (this.props.useCustomRenderers) {
			avroRenderersIds = this.props.customAvroRenderersIds;
		}
		return (
			<div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
				<div style={partStyle}>
					<ObjectViewer
						displayMode="model"
						data={this.props.sample.schema}
						menu={this.props.modelItemMenu}
						onSelect={this.onSelect}
						quality={{
							key: '@talend-quality@',
							menu: this.props.qualityMenu,
						}}
					/>
				</div>
				<div style={partStyle}>
					<ObjectViewer
						avroRenderersIds={avroRenderersIds}
						displayMode={'records'}
						data={this.props.sample.data}
						getComponent={this.props.getComponent}
						highlighted={this.state.highlighted}
						schema={this.props.sample.schema}
					/>
				</div>
			</div>
		);
	}
}
