import { useEffect, useState } from 'react';
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
	setNodeTypes: (nodeTypeMap: StateMap) => void;
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

type StateMap = { [key: string]: any };

type State = {
	nodeTypeMap: StateMap;
	linkTypeMap: StateMap;
	portTypeMap: StateMap;
};

export function FlowDesigner(props: Props) {
	const [state, setState] = useState<State>(() => {
		const nodeTypeMap: StateMap = {};
		const linkTypeMap: StateMap = {};
		const portTypeMap: StateMap = {};
		const { children } = props;
		if (children) {
			(children as any).forEach(
				(element: { type: { displayName: string }; props: { component: any; type: string } }) => {
					switch (element.type.displayName) {
						case 'NodeType':
							nodeTypeMap[element.props.type] = { component: element.props.component };
							break;
						case 'LinkType':
							linkTypeMap[element.props.type] = { component: element.props.component };
							break;
						case 'PortType':
							portTypeMap[element.props.type] = { component: element.props.component };
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
		return { nodeTypeMap, linkTypeMap, portTypeMap };
	});

	useEffect(() => {
		props.setNodeTypes(state.nodeTypeMap);
	}, []);

	return (
		<svg onClick={props.onClick} width="100%">
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
				transform={props.transform}
				transformToApply={props.transformToApply}
				setZoom={props.setZoom}
			>
				<Grid />
				<g>
					<NodesRenderer
						nodeTypeMap={state.nodeTypeMap}
						startMoveNodeTo={props.startMoveNodeTo}
						moveNodeTo={props.moveNodeTo}
						moveNodeToEnd={props.moveNodeToEnd}
						nodes={props.nodes}
						snapToGrid={props.snapToGrid || false}
					/>
					<PortsRenderer portTypeMap={state.portTypeMap} ports={props.ports} />
					<LinksRenderer linkTypeMap={state.linkTypeMap} links={props.links} ports={props.ports} />
				</g>
			</ZoomHandler>
		</svg>
	);
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
