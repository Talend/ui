import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import MappingArea from './MappingArea.js';
import { SchemaType, ConnectionParams } from '../Constants';
import { DEFAULT_I18N } from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import { Actions } from '../../Actions/index.js';

function getShowAllButtonLabel(showAll) {
	return showAll ? 'MAPPING_HIDE' : 'MAPPING_SHOW_ALL';
}

function getShowAllButtonDefaultLabel(showAll) {
	return showAll ? 'Hide' : 'Show All';
}

function getActions(t, showAll, onShowAll, clearConnection, clearMapping) {
	return [
		{
			label: t(getShowAllButtonLabel(showAll),
							{ defaultValue: getShowAllButtonDefaultLabel(showAll) }),
			onClick: onShowAll,
		},
		{
			label: t('MAPPING_CLEAR', { defaultValue: 'Clear' }),
			onClick: clearConnection,
		},
		{
			label: t('MAPPING_CLEAR_ALL', { defaultValue: 'Clear All' }),
			onClick: clearMapping,
		},
	];
}

class GMapping extends Component {
	constructor(props) {
		super(props);
		this.dndInProgress = this.dndInProgress.bind(this);
	}

	update() {
		const area = this.mappingArea.getDecoratedComponentInstance();
		area.updateCanvas(true, false, false);
	}

	dndInProgress(offset) {
		const area = this.mappingArea.getDecoratedComponentInstance();
		const pos = area.getMousePos(offset);
		const sourceYPos = this.props.getYPosition(
			this.props.dnd.source.element,
			this.props.dnd.source.type,
		);
		const params = ConnectionParams.PENDING;
		// default case: source is input
		let x1 = params.anchorRadius;
		let y1 = sourceYPos;
		let x2 = pos.x;
		let y2 = pos.y;
		if (this.props.dnd.source.type === SchemaType.OUTPUT) {
			x1 = pos.x;
			y1 = pos.y;
			x2 = area.getCanvasSize().width - params.arrowWidth / 2;
			y2 = sourceYPos;
		}
		area.updateCanvas(true, false, false);
		area.drawSingleConnection(x1, y1, x2, y2, params);
	}

	render() {
		const {
			clearConnection,
			clearMapping,
			getConnections,
			getYPosition,
			dnd,
			onShowAll,
			showAll,
			t,
		} = this.props;
		return (
			<div className="mapping mapper-element">
				<Actions
					className="mapping-tools"
					actions={
						getActions(t, showAll, onShowAll, clearConnection, clearMapping)
					}
				/>
				<MappingArea
					ref={area => {
						this.mappingArea = area;
					}}
					getConnections={getConnections}
					getYPosition={getYPosition}
					dnd={dnd}
					dndInProgress={this.dndInProgress}
				/>
			</div>
		);
	}
}

GMapping.propTypes = {
	getConnections: PropTypes.func,
	getYPosition: PropTypes.func,
	clearConnection: PropTypes.func,
	clearMapping: PropTypes.func,
	showAll: PropTypes.bool,
	onShowAll: PropTypes.func,
	dnd: PropTypes.object,
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS,
	{ i18n: DEFAULT_I18N, withRef: true })(GMapping);
