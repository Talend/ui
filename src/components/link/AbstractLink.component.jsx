import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { line, curveBasis } from 'd3-shape';
import { interpolateBasis } from 'd3-interpolate';

import * as EdgeActionCreator from '../../actions/link.actions';
import * as ConnectorActionCreator from '../../actions/port.actions';

import { getFreeInputConnectors } from '../../selectors/portSelectors';

import LinkHandle from './LinkHandle.component';

import './link.css';

const AbstractLink = React.createClass({
    propTypes: {
        link: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    },
    componentWillMount() {
        this.line = line().x(d => d.x).y(d => d.y)
            .curve(curveBasis);
        this.setState({ targetHandlePosition: this.props.target.position });
    },
    componentWillReceiveProps(nextProps) {
        this.setState({ targetHandlePosition: nextProps.target.position });
    },
    shouldComponentUpdate(nextProps) {
        return nextProps.source !== this.props.source || nextProps.target !== this.props.target;
    },
    // onTargetHandleDrag(event) {
    //     const containingCursorPosition = containing(event);
    //     const foundConnector = find(this.props.freeInputConnectors)(containingCursorPosition);
    //     if (foundConnector) {
    //         this.props.changeConnectorState(foundConnector.id, 'VALID_TARGET');
    //     } else {
    //         this.props.resetConnectorsState();
    //     }
    //     this.setState({ targetHandlePosition: event });
    // },
    // ontTargetHandleDragEnd(event) {
    //     const containingCursorPosition = containing(event);
    //     const foundConnector = find(this.props.freeInputConnectors)(containingCursorPosition);
    //     if (foundConnector) {
    //         this.props.setEdgeTarget(this.props.edge.data.id, foundConnector.id);
    //     }
    //     this.props.resetConnectorsState();
    // },
    render() {
        const pathCoords = [];
        // if (this.state.targetHandlePosition && this.props.source.position) {
            pathCoords[0] = this.state.targetHandlePosition;
            pathCoords[1] = {
                x: this.state.targetHandlePosition.x - 50,
                y: this.state.targetHandlePosition.y,
            };
            pathCoords[2] = {
                x: this.props.source.position.x + 50,
                y: this.props.source.position.y,
            };
            pathCoords[3] = {
                x: this.props.source.position.x + 10,
                y: this.props.source.position.y,
            };
            const xInterpolate = interpolateBasis([pathCoords[0].x, pathCoords[1].x, pathCoords[2].x, pathCoords[3].x]);
            const yInterpolate = interpolateBasis([pathCoords[0].y, pathCoords[1].y, pathCoords[2].y, pathCoords[3].y]);
            this.path = this.line(pathCoords);
            const newChildren = React.Children.map(this.props.children, child => (
                React.cloneElement(child, { d: this.path, xInterpolate, yInterpolate })
            ));
            return (
                <g>
                  {newChildren}
                  <LinkHandle
                    onDrag={this.onTargetHandleDrag} onDragEnd={this.ontTargetHandleDragEnd}
                    position={this.state.targetHandlePosition}
                  />
                </g>
            );
        // }
        // return null;
    },
});

const mapStateToProps = (state, ownProps) => ({
    source: state.flowDesigner.ports.get(ownProps.link.sourceId),
    target: state.flowDesigner.ports.get(ownProps.link.targetId),
    // freeInputConnectors: getFreeInputConnectors(state),
});

export default connect(mapStateToProps, undefined)(AbstractLink);
