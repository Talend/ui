import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { mapOf, orderedMapOf } from 'react-immutable-proptypes';
import invariant from 'invariant';


import ZoomHandler from './ZoomHandler.component';
import Grid from './grid/Grid.component';
import { NodeType, PortType } from '../constants/flowdesigner.proptypes';
import NodesRenderer from './node/NodesRenderer.component';
import LinksRenderer from './link/LinksRenderer.component';
import PortsRenderer from './port/PortsRenderer.component';

import { moveNodeTo, moveNodeToEnd } from '../actions/node.actions';
import { setNodeTypes } from '../actions/nodeType.actions';



export const FlowDesigner = React.createClass({
    propTypes: {
        children: PropTypes.node,
        setNodeTypes: PropTypes.func.isRequired,
        moveNodeTo: PropTypes.func.isRequired,
        nodes: mapOf(
            NodeType
        ).isRequired,
        ports: orderedMapOf(PortType).isRequired,
        links: mapOf(PropTypes.object).isRequired,
    },
    getInitialState() {
        return {
            nodeTypeMap: {},
            linkTypeMap: {},
        };
    },
    componentWillMount() {
        const { children } = this.props;
        let nodeTypeMap = {};
        let linkTypeMap = {};
		let portTypeMap = {};
        if (children) {
            children.forEach(element => {
                switch (element.type.displayName) {
                case 'NodeType':
                    nodeTypeMap = Object.assign(
                    	{},
                    	nodeTypeMap,
                        {
                            [element.props.type]: {
                                component: element.props.component,
                            },
                        }
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
                        }
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
                        }
					)
					break;
                default:
                    invariant(
                    false,
                    `<${element.type.displayName} /> is an unknown component configuration`
                );
                }
            });
        } else {
            invariant(false, '<FlowDesigner /> should have configuration component as child');
        }

        this.props.setNodeTypes(nodeTypeMap);
        this.setState({ nodeTypeMap, linkTypeMap, portTypeMap });
    },
    render() {
        return (
          <svg ref={c => (this.node = c)} width="100%" height="800">
            <defs>
              <filter id="blur-filter" x="-1" y="-1" width="200" height="200">
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
            <ZoomHandler>
              <Grid />
              <NodesRenderer
                nodeTypeMap={this.state.nodeTypeMap}
                moveNodeTo={this.props.moveNodeTo}
                moveNodeToEnd={this.props.moveNodeToEnd}
                nodes={this.props.nodes}
              />
              <PortsRenderer
			  	portTypeMap={this.state.portTypeMap}
			  	ports={this.props.ports} />
              <LinksRenderer
                linkTypeMap={this.state.linkTypeMap}
                links={this.props.links}
                ports={this.props.ports}
              />
            </ZoomHandler>
          </svg>
        );
    },
});

const mapStateToProps = state => ({
    nodes: state.flowDesigner.get('nodes'),
    links: state.flowDesigner.get('links'),
    ports: state.flowDesigner.get('ports'),
});


const mapDispatchToProps = dispatch => ({
    setNodeTypes: (nodeTypeMap) => dispatch(setNodeTypes(nodeTypeMap)),
    moveNodeTo: (nodId, nodePosition) => (dispatch(moveNodeTo(nodId, nodePosition))),
    moveNodeToEnd: (nodId, nodePosition) => (dispatch(moveNodeToEnd(nodId, nodePosition))),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowDesigner);
