import React from 'react';
import ReactDOM from 'react-dom';
import genericViewerConfiguration from './genericViewer.configuration';
import ModelMenus from './ModelMenus.component';
import QualityCircles from './QualityCircles.component';
import GenericViewer from '../Generic';

import theme from './ModelViewer.scss';

export default class ModelViewer extends React.Component {
	constructor(props) {
		super(props);
		this.getItemMenu = this.getItemMenu.bind(this);
		this.onCloseOverlay = this.onCloseOverlay.bind(this);
		this.onClickItemMenu = this.onClickItemMenu.bind(this);
	}

	onCloseOverlay(focusedItem) {
		ReactDOM.findDOMNode(focusedItem).focus(); // eslint-disable-line react/no-find-dom-node
	}

	onClickItemMenu(clickedItemMenu) {
		clickedItemMenu.hide();
	}

	getItemMenu({ value, jsonpath }) {
		return (
			<ModelMenus
				item={value}
				jsonpath={jsonpath}
				menu={this.props.menu}
				quality={this.props.quality}
				onCloseOverlay={this.onCloseOverlay}
				onClickItemMenu={this.onClickItemMenu}
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
				opened={this.props.isSingle ? this.props.opened.default : this.props.opened}
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
