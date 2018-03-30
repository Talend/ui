import React from 'react';

import genericViewerConfiguration from './genericViewer.configuration';
import ModelMenus from './ModelMenus.component';
import QualityCircles from './QualityCircles.component';
import GenericViewer from '../Generic';

import theme from './ModelViewer.scss';

export default class ModelViewer extends React.Component {
	constructor(props) {
		super(props);
		this.getItemMenu = this.getItemMenu.bind(this);
	}

	getItemMenu({ value, jsonpath }) {
		return (
			<ModelMenus
				item={value}
				jsonpath={jsonpath}
				menu={this.props.menu}
				quality={this.props.quality}
			/>
		);
	}

	render() {
		console.log('this.props.opened', this.props.opened);
		const opened = this.props.opened['default'];
		console.log('opened', opened);
		return (
			<GenericViewer
				{...this.props}
				{...genericViewerConfiguration}
				className={theme.model}
				getItemMenu={this.getItemMenu}
				opened={opened ? opened : []}
				noRoot
			/>
		);
	}
}
ModelViewer.defaultProps = {
	data: [],
	quality: {},
};
ModelViewer.propTypes = {
	menu: ModelMenus.propTypes.menuItems,
	quality: QualityCircles.propTypes.quality,
};
