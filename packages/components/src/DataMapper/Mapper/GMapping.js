import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GMapping extends Component {

	constructor(props) {
		super(props);
		this.state = {
			width: -1,
			height: -1,
		};
		this.dndInProgress = this.dndInProgress.bind(this);
		this.updateMappingAreaRef = this.updateMappingAreaRef.bind(this);
		this.updateMappingContentRef = this.updateMappingContentRef.bind(this);
		this.checkMappingContentResize = this.checkMappingContentResize.bind(this);
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

	updateMappingContentRef(ref) {
		this.mappingContentRef = ref;
	}

	render() {
		const {
			mappingConfiguration,
			getConnections,
			getAnchors,
			getYPosition,
			dnd,
			preferences,
		} = this.props;
		const MappingActions = mappingConfiguration.getActions();
		const MappingRenderer = mappingConfiguration.getRenderer();
		return (
			<div className="mapping mapper-element">
				<MappingActions
					{...this.props}
				/>
				<div className="separator horizontal" />
				<div ref={this.updateMappingContentRef} className="mapping-content">
					<MappingRenderer
						{...this.props}
						ref={this.updateMappingAreaRef}
						dndInProgress={this.dndInProgress}
						width={this.state.width}
						height={this.state.height}
					/>
				</div>
			</div>
		);
	}
}

GMapping.propTypes = {
	mappingConfiguration: PropTypes.object,
};
