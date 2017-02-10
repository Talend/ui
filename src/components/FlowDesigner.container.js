import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapOf } from 'react-immutable-proptypes';
import invariant from 'invariant';
import get from 'lodash/get';

import { setZoom } from '../actions/flow.actions';
import Grid from './grid/Grid.component';
import ZoomHandler from './ZoomHandler.component';
import { NodeType, PortType } from '../constants/flowdesigner.proptypes';
import NodesRenderer from './node/NodesRenderer.component';
import LinksRenderer from './link/LinksRenderer.component';
import PortsRenderer from './port/PortsRenderer.component';

import { moveNodeTo, moveNodeToEnd } from '../actions/node.actions';
import { setNodeTypes } from '../actions/nodeType.actions';

export class FlowDesigner extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		setNodeTypes: PropTypes.func.isRequired,
		moveNodeTo: PropTypes.func.isRequired,
		moveNodeToEnd: PropTypes.func,
		nodes: mapOf(NodeType).isRequired,
		ports: mapOf(PortType).isRequired,
		links: mapOf(PropTypes.object).isRequired,
		reduxMountPoint: PropTypes.string.isRequired,
		onClick: PropTypes.func,
		transform: ZoomHandler.propTypes.transform,
		transformToApply: ZoomHandler.propTypes.transformToApply,
		setZoom: ZoomHandler.propTypes.setZoom,
		gridComponent: PropTypes.element,
	}

	constructor(props) {
		super(props);
		this.state = {
			nodeTypeMap: {},
			linkTypeMap: {},
			portTypeMap: {},
		};
	}

	componentWillMount() {
		const { children } = this.props;
		let nodeTypeMap = {};
		let linkTypeMap = {};
		let portTypeMap = {};
		if (children) {
			children.forEach((element) => {
				switch (element.type.displayName) {
				case 'NodeType':
					nodeTypeMap = Object.assign(
						{},
						nodeTypeMap,
						{
							[element.props.type]: {
								component: element.props.component,
							},
						},
					);
					break;
				case 'LinkType':
					linkTypeMap = Object.assign(
						{},
						linkTypeMap,
						{
							[element.props.type]: {
								component: element.props.component,
							},
						},
					);
					break;
				case 'PortType':
					portTypeMap = Object.assign(
						{},
						portTypeMap,
						{
							[element.props.type]: {
								component: element.props.component,
							},
						},
					);
					break;
				default:
					invariant(
					false,
					`<${element.type.displayName} /> is an unknown component configuration`,
				);
				}
			});
		} else {
			invariant(false, '<FlowDesigner /> should have configuration component as child');
		}

		this.props.setNodeTypes(nodeTypeMap);
		this.setState({ nodeTypeMap, linkTypeMap, portTypeMap });
	}

	render() {
		return (
			<svg
				onClick={this.props.onClick}
				ref={c => (this.node = c)}
				width="100%"
			>
				<defs>
					<filter id="blur-filter" width="1.5" height="1.5" x="-.25" y="-.25">
						<feFlood floodColor="#01A7CF" result="COLOR" />
						<feComposite in="COLOR" in2="SourceGraphic" operator="in" result="shadow" />
						<feGaussianBlur in="shadow" stdDeviation="3" />
						<feOffset dx="0" dy="0" />
						<feMerge>
							<feMergeNode />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<ZoomHandler
					transform={this.props.transform}
					transformToApply={this.props.transformToApply}
					setZoom={this.props.setZoom}
				>
					<Grid gridComponent={this.props.gridComponent} />
					<g>
						<NodesRenderer
							nodeTypeMap={this.state.nodeTypeMap}
							moveNodeTo={this.props.moveNodeTo}
							moveNodeToEnd={this.props.moveNodeToEnd}
							nodes={this.props.nodes}
						/>
						<PortsRenderer
							portTypeMap={this.state.portTypeMap}
							ports={this.props.ports}
						/>
						<LinksRenderer
							linkTypeMap={this.state.linkTypeMap}
							links={this.props.links}
							ports={this.props.ports}
						/>
					</g>
				</ZoomHandler>
			</svg>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	nodes: get(state, ownProps.reduxMountPoint).get('nodes'),
	links: get(state, ownProps.reduxMountPoint).get('links'),
	ports: get(state, ownProps.reduxMountPoint).get('ports'),
	transform: get(state, ownProps.reduxMountPoint).get('transform'),
	transformToApply: get(state, ownProps.reduxMountPoint).get('transformToApply'),
});


const mapDispatchToProps = dispatch => ({
	setNodeTypes: nodeTypeMap => dispatch(setNodeTypes(nodeTypeMap)),
	moveNodeTo: (nodId, nodePosition) => (dispatch(moveNodeTo(nodId, nodePosition))),
	moveNodeToEnd: (nodId, nodePosition) => (dispatch(moveNodeToEnd(nodId, nodePosition))),
	setZoom: transform => dispatch(setZoom(transform)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowDesigner);
