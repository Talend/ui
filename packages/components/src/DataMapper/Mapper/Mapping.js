import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Mapping extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 1,
			height: 1,
		};
		this.updateMappingAreaRef = this.updateMappingAreaRef.bind(this);
		this.updateMappingContentRef = this.updateMappingContentRef.bind(this);
		this.checkMappingContentResize = this.checkMappingContentResize.bind(this);
	}

	componentDidMount() {
		this.intervalRef = setInterval(this.checkMappingContentResize, 250);
	}

	componentWillUnmount() {
		clearInterval(this.intervalRef);
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

	checkMappingContentResize() {
		if (this.mappingContentRef) {
			const width = this.mappingContentRef.clientWidth;
			const height = this.mappingContentRef.clientHeight;
			if (this.state.width !== width || this.state.height !== height) {
				this.setState({ width, height });
			}
		}
	}

	update() {
		this.getArea().update();
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

	updateMappingContentRef(ref) {
		this.mappingContentRef = ref;
	}

	render() {
		const { dndListener, ...mappingProps } = this.props;
		const { mappingConfiguration } = this.props;
		const MappingActions = mappingConfiguration.getActions();
		const MappingRenderer = mappingConfiguration.getRenderer();
		return (
			<div className="mapping mapper-element">
				<MappingActions {...this.props} />
				<div className="separator horizontal" />
				<div ref={this.updateMappingContentRef} className="mapping-content">
					<MappingRenderer
						{...mappingProps}
						ref={this.updateMappingAreaRef}
						dndListener={this}
						width={this.state.width}
						height={this.state.height}
					/>
				</div>
			</div>
		);
	}
}

Mapping.propTypes = {
	mappingConfiguration: PropTypes.object,
	dndListener: PropTypes.object,
};
