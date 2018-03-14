import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ModelItemMenu from './ModelItemMenu.component';
import QualityCircles from './QualityCircles.component';
import { Action } from '../../Actions';

import theme from './ModelViewer.scss';

export default class ModelMenus extends React.Component {
	constructor(props) {
		super(props);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onOverlayClose = this.onOverlayClose.bind(this);
	}

	onMenuItemClick() {
		this.overlay.hide();
	}

	/*
	Accessibility : set focus back on the button when overlay is closed
	 */
	onOverlayClose() {
		ReactDOM.findDOMNode(this.button).focus(); // eslint-disable-line react/no-find-dom-node
	}

	render() {
		const { item, jsonpath, menu, quality } = this.props;
		return (
			<div className={theme.menu}>
				{
					menu &&
					<Action
						aria-label={'Open menu'}
						buttonRef={button => { this.button = button; }}
						className={theme['menu-trigger']}
						link
						label={'...'}
						overlayId={`tc-object-viewer-model-menu-${jsonpath}`}
						overlayPlacement={'bottom'}
						overlayComponent={
							<ModelItemMenu
								menuItems={menu}
								onClose={this.onOverlayClose}
								onMenuItemClick={this.onMenuItemClick}
								item={item}
								jsonpath={jsonpath}
							/>
						}
						overlayRef={overlay => { this.overlay = overlay; }}
					/>
				}
				<QualityCircles item={item} quality={quality} jsonpath={jsonpath} />
			</div>
		);
	}
}
ModelMenus.propTypes = {
	item: PropTypes.object,
	jsonpath: PropTypes.string,
	menu: ModelItemMenu.propTypes.menuItems,
	quality: QualityCircles.propTypes.quality,
};
