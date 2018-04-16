import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ModelItemMenu from './ModelItemMenu.component';
import QualityCircles from './QualityCircles.component';
import { Action } from '../../Actions';

import theme from './ModelViewer.scss';

export default class ModelMenus extends React.Component {
	constructor(props) {
		super(props);
		this.onClickItemMenu = this.onClickItemMenu.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onClickItemMenu() {
		this.overlay.hide();
	}

	onClose() {
		this.props.onCloseOverlay(this.button);
	}

	render() {
		const { item, jsonpath, menu, quality } = this.props;
		return (
			<div className={classNames(theme['tc-model-menu'], 'tc-model-menu')}>
				{menu && (
					<Action
						aria-label="Open menu"
						buttonRef={button => {
							this.button = button;
						}}
						className={classNames(
							theme['tc-model-menu-trigger'],
							'tc-model-menu-trigger',
						)}
						link
						label="..."
						overlayId={`tc-object-viewer-model-menu-${jsonpath}`}
						overlayPlacement="bottom"
						overlayComponent={
							<ModelItemMenu
								menuItems={menu}
								item={item}
								jsonpath={jsonpath}
								onClose={this.onClose}
								onClickItemMenu={this.onClickItemMenu}
							/>
						}
						overlayRef={overlay => {
							this.overlay = overlay;
						}}
					/>
				)}
				<QualityCircles
					item={item}
					quality={quality}
					jsonpath={jsonpath}
					onCloseOverlay={this.props.onCloseOverlay}
				/>
			</div>
		);
	}
}
ModelMenus.propTypes = {
	item: PropTypes.object,
	jsonpath: PropTypes.string,
	menu: ModelItemMenu.propTypes.menuItems,
	quality: QualityCircles.propTypes.quality,
	onCloseOverlay: PropTypes.func,
};
