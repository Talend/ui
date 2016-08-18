import { createSelector } from 'reselect';

const getPorts = state => state.ports;
const getLinks = state => state.links;

export const getDetachedLinks = createSelector(
    [getLinks, getPorts],
    (links, ports) => (
        links.filter(
            link => !ports.find(port => port.id === link.sourceId)
                || !ports.find(port => port.id === link.targetId)
        )
    )
);
