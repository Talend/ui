import React from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import get from 'lodash/get';
import { Map } from 'immutable';

import { setZoom } from '../actions/flow.actions';
import Grid from './grid/Grid.component';
import ZoomHandler from './ZoomHandler.component';
import NodesRenderer from './node/NodesRenderer.component';
import LinksRenderer from './link/LinksRenderer.component';
import PortsRenderer from './port/PortsRenderer.component';

import { startMoveNodeTo, moveNodeTo, moveNodeToEnd } from '../actions/node.actions';
import { setNodeTypes } from '../actions/nodeType.actions';
import {
	Transform,
	NodeRecordMap,
	PortRecordMap,
	LinkRecordMap,
	Position,
	Id,
} from '../customTypings/index.d';

type Props = {
	children?: any;
	setNodeTypes: (nodeTypeMap: Map<string, any>) => void;
	startMoveNodeTo: (nodeId: Id, nodePosition: string) => void;
	moveNodeTo: (nodeId: Id, nodePosition: Position) => void;
	moveNodeToEnd: (nodeId: Id, nodePosition: Position) => void;
	nodes: NodeRecordMap;
	ports: PortRecordMap;
	links: LinkRecordMap;
	reduxMountPoint: string;
	onClick?: () => {};
	transform?: Transform;
	transformToApply?: Transform;
	setZoom?: (transform: Transform) => void;
	snapToGrid?: boolean;
};

type State = {
	nodeTypeMap: Map<string, any>;
	linkTypeMap: Map<string, any>;
	portTypeMap: Map<string, any>;
};

export class FlowDesigner extends React.Component<Props, State> {
	node: any;

	static defaultProps = {
		snapToGrid: false,
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			nodeTypeMap: Map(),
			linkTypeMap: Map(),
			portTypeMap: Map(),
		};
	}

	UNSAFE_componentWillMount() {
		const { children } = this.props;
		let nodeTypeMap = Map<string, any>();
		let linkTypeMap = Map<string, any>();
		let portTypeMap = Map<string, any>();
		if (children) {
			(children as any).forEach(
				(element: {
					type: { displayName: string };
					props: { component: any; type: string };
				}) => {
					switch (element.type.displayName) {
						case 'NodeType':
							nodeTypeMap = {
								...nodeTypeMap,
								[element.props.type]: {
									component: element.props.component,
								},
							};
							break;
						case 'LinkType':
							linkTypeMap = {
								...linkTypeMap,
								[element.props.type]: {
									component: element.props.component,
								},
							};
							break;
						case 'PortType':
							portTypeMap = {
								...portTypeMap,
								[element.props.type]: {
									component: element.props.component,
								},
							};
							break;
						default:
							invariant(
								false,
								`<${element.type.displayName} /> is an unknown component configuration`,
							);
					}
				},
			);
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
				ref={c => {
					this.node = c;
				}}
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
					<Grid />
					<g>
						<NodesRenderer
							nodeTypeMap={this.state.nodeTypeMap}
							startMoveNodeTo={this.props.startMoveNodeTo}
							moveNodeTo={this.props.moveNodeTo}
							moveNodeToEnd={this.props.moveNodeToEnd}
							nodes={this.props.nodes}
							snapToGrid={this.props.snapToGrid || false}
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

const mapStateToProps = (state: State, ownProps: Props) => ({
	nodes: get(state, ownProps.reduxMountPoint).get('nodes'),
	links: get(state, ownProps.reduxMountPoint).get('links'),
	ports: get(state, ownProps.reduxMountPoint).get('ports'),
	transform: get(state, ownProps.reduxMountPoint).get('transform'),
	transformToApply: get(state, ownProps.reduxMountPoint).get('transformToApply'),
});

const mapDispatchToProps = (dispatch: any) => ({
	setNodeTypes: (nodeTypeMap: Map<string, any>) => dispatch(setNodeTypes(nodeTypeMap)),
	startMoveNodeTo: (nodeId: Id, nodePosition: string) =>
		dispatch(startMoveNodeTo(nodeId, nodePosition)),
	moveNodeTo: (nodeId: Id, nodePosition: Position) => dispatch(moveNodeTo(nodeId, nodePosition)),
	moveNodeToEnd: (nodeId: Id, nodePosition: Position) =>
		dispatch(moveNodeToEnd(nodeId, nodePosition)),
	setZoom: (transform: Transform) => dispatch(setZoom(transform)),
});

const connector: any = connect(mapStateToProps, mapDispatchToProps);

export default connector(FlowDesigner);
