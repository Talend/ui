import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

const getNodes = state => state.get('nodes');
const getPorts = state => state.get('ports');
const getLinks = state => state.get('links');

/**
 * Create and return function who will return all ports for a specific node
 * @return {getPortsForNode}
 */
export const getPortsForNode = createSelector(
  getPorts,
  ports => memoize(
    nodeId => ports.filter(port => port.nodeId === nodeId)
  )
);


/**
 * Get all the data Emitter port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getEmitterPorts = createSelector(
  getPorts,
  ports => (
    ports.filter(port => port.attr.get('type') === 'EMITTER')
  )
);

/**
 * Get all the data Sink port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getSinkPorts = createSelector(
  getPorts,
  ports => (
    ports.filter(port => port.attr.get('type') === 'SINK')
  )
);

/**
 * Create and return function who will return all Emitter ports for a specific node
 */
export const getEmitterPortsForNode = createSelector(
  getEmitterPorts,
  ports => (
    nodeId => ports.filter(port => port.nodeId === nodeId)
  )
);

/**
 * Create and return function who will return all Sink ports for a specific node
 */
export const getSinkPortsForNode = createSelector(
  getSinkPorts,
  ports => (
    nodeId => ports.filter(port => port.nodeId === nodeId)
  )
);

/**
 * Get all the data Sink port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeSinkPorts = createSelector(
  [getSinkPorts, getLinks],
  (sinkPorts, links) => (
    sinkPorts.filter(sinkPort => (
      !links.find(link => (
        link.targetId === sinkPort.id
      ))
    ))
  )
);

/**
 * Get all the data Emitter port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeEmitterPorts = createSelector(
    [getEmitterPorts, getLinks],
    (emitterPorts, links) => (
        emitterPorts.filter(emitterPort =>
            !links.find(link => (
                link.sourceId === emitterPort.id
            ))
        )
    )
);

/**
 * Get all the data sink port attached to every node not attached at a single edge
 * as single map of port with an generated attached key
 * map key is the port id
 * @return Map
 */
export const getActionKeyedPorts = createSelector(
  [getFreeSinkPorts],
  freeSinkPorts => (
    freeSinkPorts.filter(sinkPort => sinkPort.accessKey)
  )
);

export const getDetachedPorts = createSelector(
    [getPorts, getNodes],
    (ports, nodes) => (
        ports.filter(
            port => !nodes.find(
                node => node.id === port.nodeId
            )
        )
    )
);
