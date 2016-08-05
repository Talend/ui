import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { line, curveBasis } from 'd3-shape';
import { interpolateBasis } from 'd3-interpolate';

import * as EdgeActionCreator from '../../actions/link.actions';
import * as ConnectorActionCreator from '../../actions/port.actions';

import { getFreeInputConnectors } from '../../selectors/portSelectors';

import LinkHandle from './LinkHandle.component';

import './link.css';

const calculatePath = (sourcePosition, targetPosition) => {
    const pathCoords = [];
    pathCoords[0] = targetPosition;
    pathCoords[1] = {
        x: sourcePosition.x + 10,
        y: sourcePosition.y,
    };
    const xInterpolate = interpolateBasis([targetPosition.x, pathCoords[1].x]);
    const yInterpolate = interpolateBasis([targetPosition.y, pathCoords[1].y]);
    const path = line().x(d => d.x).y(d => d.y)
            .curve(curveBasis)(pathCoords);
    return { path, xInterpolate, yInterpolate };
};

const AbstractLink = React.createClass({
    propTypes: {
        link: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    },
    statics: calculatePath,
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
        const pathCalculationMethod = this.props.calculatePath || calculatePath;
        const { path, xInterpolate, yInterpolate } = pathCalculationMethod(
            this.props.source.position,
            this.state.targetHandlePosition
        );
        const newChildren = React.Children.map(this.props.children, child => (
                React.cloneElement(child, { d: path, xInterpolate, yInterpolate })
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
    },
});

const mapStateToProps = (state, ownProps) => ({
    source: state.flowDesigner.ports.get(ownProps.link.sourceId),
    target: state.flowDesigner.ports.get(ownProps.link.targetId),
});

export default connect(mapStateToProps, undefined)(AbstractLink);
