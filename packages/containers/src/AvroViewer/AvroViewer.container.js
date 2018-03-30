import React from 'react';
import PropTypes from 'prop-types';
import { ObjectViewer } from '@talend/react-components';
import ObjectViewerCtn from './ObjectViewer.connect';

/*
function ToggleManager(Component) {
	return class ToggledComponentWrapper extends React.Component {
		static displayName = `ToggleManager(${Component.displayName})`;
		static propTypes = {
			onToggle: PropTypes.func,
		};

		constructor(props) {
			super(props);
			this.state = { opened: [], isSingle: false };
			this.onToggle = this.onToggle.bind(this);
		}

		onToggle(event, options, index = 'default') {
			let itemOpened = (this.state.opened && this.state.opened[index]) || [];
			if (options.isOpened) {
				itemOpened = itemOpened.filter(path => path !== options.jsonpath);
			} else {
				itemOpened = itemOpened.concat(options.jsonpath);
			}

			this.setState({
				isSingle: index === 'default',
				opened: {
					...this.state.opened,
					[index]: itemOpened,
				},
			});

			if (this.props.onToggle) {
				this.props.onToggle(event, options, index);
			}
		}

		render() {
			const opened = this.state.isSingle ? this.state.opened.default : this.state.opened;
			return <Component {...this.props} onToggle={this.onToggle} opened={opened} />;
		}
	};
}
*/

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
		// let avroRenderersIds;
		// if (this.props.useCustomRenderers) {
		// 	avroRenderersIds = this.props.customAvroRenderersIds;
		// }
		return (
			<div style={{ display: 'flex', alignItems: 'stretch', height: '1000px' }}>
				<div style={partStyle}>
					<ObjectViewerCtn
						componentId="Model"
						displayMode="model"
						onSelect={this.onSelect}
						data={this.props.sample.schema}
						menu={this.props.modelItemMenu}
						quality={{
							key: '@talend-quality@',
							menu: this.props.qualityMenu,
						}}
					/>
				</div>
				<div style={partStyle}>
					<ObjectViewerCtn
						componentId="Records"
						avroRenderersIds={
							this.props.useCustomRenderers ? this.props.customAvroRenderersIds : ''
						}
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
