import React from 'react';

import genericViewerConfiguration from './genericViewer.configuration';
import ModelMenus from './ModelMenus.component';
import QualityCircles from './QualityCircles.component';
import GenericViewer from '../../ObjectViewer/Generic';

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
		return (
			<GenericViewer
				{...this.props}
				{...genericViewerConfiguration}
				className={theme.model}
				getItemMenu={this.getItemMenu}
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
