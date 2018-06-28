import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from '@talend/react-components';
import MappingSVG from './MappingSVG';

export default class Mapping extends Component {
	constructor(props) {
		super(props);
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
			reveal() {
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

	updateDND() {
		if (this.getArea().updateDND) {
			this.getArea().updateDND();
		}
	}

	reveal(connectionKey) {
		this.getArea().reveal(connectionKey);
	}

	beginDrag(element, side) {
		return this.props.dndListener.beginDrag(element, side);
	}

	dndInProgress(offset) {
		const pos = this.getArea().getMousePos(offset);
		this.props.dndListener.dndInProgress(pos);
	}

	canDrop(sourceItem, targetItem) {
		return this.props.dndListener.canDrop(sourceItem, targetItem);
	}

	drop(sourceItem, targetItem) {
		this.props.dndListener.drop(sourceItem, targetItem);
	}

	endDrag() {
		this.props.dndListener.endDrag();
	}

	updateMappingAreaRef(ref) {
		this.mappingAreaRef = ref;
	}

	render() {
		const { dndListener, mappingActions, ...mappingProps } = this.props;		
		return (
			<div className="mapping mapper-element">
				<Actions className="mapping-actions" actions={mappingActions} />
				<MappingSVG {...mappingProps} ref={this.updateMappingAreaRef} dndListener={this} />
			</div>
		);
	}
}

Mapping.propTypes = {
	mappingActions: PropTypes.object,
	dndListener: PropTypes.object,
};
