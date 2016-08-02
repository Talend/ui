import React from 'react';
import { connect } from 'react-redux';

import { select } from 'd3-selection';

import invariant from 'invariant';


import { ZoomHandler } from './ZoomHandler.component';
import Grid from './grid/Grid.component';
import NodesRenderer from './NodesRenderer.component';
import LinksRenderer from './LinksRenderer.component';
import PortsRenderer from './PortsRenderer.component';

import { moveNodeTo } from '../actions/node.actions';
import { setNodeTypes } from '../actions/nodeType.actions';

export const FlowDesigner = React.createClass({
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
        this.setState({ nodeTypeMap, linkTypeMap });
    },
    componentDidMount() {
        this.d3Node = select('body');
        // should be destroyed and recreated each time the connector/accesky map is modified
        // to avoid dispatching unecessary action
        this.d3Node.on('keydown', () => {
            this.props.onKeyDown(event.keyCode);
        });
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
                nodes={this.props.nodes}
              />
              <PortsRenderer ports={this.props.ports} />
              <LinksRenderer linkTypeMap={this.state.linkTypeMap} links={this.props.links} />
            </ZoomHandler>
          </svg>
        );
    },
});

const mapStateToProps = state => ({
    nodes: state.flowDesigner.nodes,
    links: state.flowDesigner.links,
    ports: state.flowDesigner.ports,
});


const mapDispatchToProps = dispatch => ({
    setNodeTypes: (nodeTypeMap) => dispatch(setNodeTypes(nodeTypeMap)),
    moveNodeTo: (nodId, nodePosition) => (dispatch(moveNodeTo(nodId, nodePosition))),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowDesigner);
