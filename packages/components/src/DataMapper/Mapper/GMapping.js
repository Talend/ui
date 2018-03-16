import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import MappingArea from './MappingArea.js';
import MappingSVG from './MappingSVG.js';
import * as Constants from '../Constants';
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
			id: 'show-all',
			label: t(getShowAllButtonLabel(showAll), {
				defaultValue: getShowAllButtonDefaultLabel(showAll),
			}),
			onClick: onShowAll,
		},
		{
			id: 'clear-connection',
			label: t('MAPPING_CLEAR', { defaultValue: 'Clear' }),
			onClick: clearConnection,
		},
		{
			id: 'clear-mapping',
			label: t('MAPPING_CLEAR_ALL', { defaultValue: 'Clear All' }),
			onClick: clearMapping,
		},
	];
}

function renderMappingArea(
	renderer,
	getConnections,
	getYPosition,
	dnd,
	updateRef,
	dndInProgress
) {
	switch (renderer) {
		case Constants.Connection.RENDERER.CANVAS:
			return (
				<MappingArea
					ref={updateRef}
					getConnections={getConnections}
					getYPosition={getYPosition}
					dnd={dnd}
					dndInProgress={dndInProgress}
				/>
			);
		case Constants.Connection.RENDERER.SVG:
			return (
				<MappingSVG
					ref={updateRef}
					getConnections={getConnections}
					getYPosition={getYPosition}
					dnd={dnd}
					dndInProgress={dndInProgress}
				/>
			);
		default:
			return (
				<div>Cannot render mapping area</div>
			);
	}
}

class GMapping extends Component {

	constructor(props) {
		super(props);
		this.dndInProgress = this.dndInProgress.bind(this);
		this.updateMappingAreaRef = this.updateMappingAreaRef.bind(this);
	}

	getArea() {
		if (this.mappingAreaRef) {
			let area = this.mappingAreaRef;
			if (this.mappingAreaRef.getDecoratedComponentInstance) {
				area = this.mappingAreaRef.getDecoratedComponentInstance();
			}
			return area;
		}
		return {
			update() {
				// LOG
			},
			getMousePos(offset) {
				return offset;
			},
		};
	}

	update() {
		this.getArea().update();
	}

	dndInProgress(offset) {
		const pos = this.getArea().getMousePos(offset);
		this.props.dndInProgress(pos);
	}

	updateMappingAreaRef(ref) {
		this.mappingAreaRef = ref;
	}

	render() {
		const {
			renderer,
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
					actions={getActions(t, showAll, onShowAll, clearConnection, clearMapping)}
				/>
				{
					renderMappingArea(
						renderer,
						getConnections,
						getYPosition,
						dnd,
						this.updateMappingAreaRef,
						this.dndInProgress)
				}
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
	dndInProgress: PropTypes.func,
	t: PropTypes.func,
	renderer: PropTypes.string,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N, withRef: true })(GMapping);
