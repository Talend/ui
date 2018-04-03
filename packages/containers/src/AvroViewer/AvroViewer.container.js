import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// import { ObjectViewer } from '@talend/react-components';
// import ObjectViewerCtn from './ObjectViewer.connect';
import Toggle from './Toggle.connect';

export const DEFAULT_STATE = Map({
	// edited: new List(), // Array of JSONPath
	// opened: new List(), // Array of JSONPath
	// selectedJsonpath: '', // Selected JSONPath
	// modified: new Map(), // Store the onChange
	highlighted: List(),
	// isSingle: false,
});

export default class AvroViewer extends React.Component {
	static displayName = 'Container(AvroViewer)';

	constructor(props) {
		super(props);
		this.state = { highlighted: [] };
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, jsonpath) {
		const state = this.props.state || DEFAULT_STATE;
		const adaptedJsonPath = jsonpath
			.replace(/[-[{}()*+?.,\\^$|#\s]/g, '\\$&')
			.replace(/\[]/g, '[[0-9]+]');
		this.setState({
			highlighted: [new RegExp(`^${adaptedJsonPath}$`)],
		});
		this.props.setState({
			highlighted: state.get('highlighted').set(0, new RegExp(`^${adaptedJsonPath}$`)),
		});
	}

	render() {
		const partStyle = {
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: 50,
		};
		const state = this.props.state || DEFAULT_STATE;
		return (
			<div style={{ display: 'flex', alignItems: 'stretch', height: '1000px' }}>
				<div style={partStyle}>
					<Toggle
						componentId="Model"
						// component={ObjectViewer}
						displayMode="model"
						onSelect={this.onSelect}
						data={this.props.sample.schema}
						menu={this.props.modelItemMenu}
						quality={{
							key: '@talend-quality@',
							menu: this.props.qualityMenu,
						}}
						isSingle
					/>
				</div>
				<div style={partStyle}>
					<Toggle
						componentId="Records"
						// component={ObjectViewer}
						avroRenderersIds={
							this.props.useCustomRenderers ? this.props.customAvroRenderersIds : ''
						}
						displayMode={'records'}
						data={this.props.sample.data}
						getComponent={this.props.getComponent}
						highlighted={state.get('highlighted').toJS()}
						schema={this.props.sample.schema}
					/>
				</div>
			</div>
		);
	}
}
