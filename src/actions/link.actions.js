import {
    FLOWDESIGNER_LINK_ADD,
    FLOWDESIGNER_LINK_SET_TARGET,
    FLOWDESIGNER_LINK_SET_SOURCE,
    FLOWDESIGNER_LINK_REMOVE,
    FLOWDESIGNER_LINK_SET_ATTR,
} from '../constants/flowdesigner.constants';

/**
 * Ask for link creation
 * @param {string} linkId
 * @param {string} sourceId - the source port Identifier
 * @param {string} targetId - the target port Identifier
 * @param {string} linkType
 * @param {Object} attr
 */
export const addLink = (linkId, sourceId, targetId, linkType, attr) => ({
    type: FLOWDESIGNER_LINK_ADD,
    linkId,
    sourceId,
    targetId,
    linkType,
    attr,
});

/**
 * Ask for change of link target
 * @param {string} linkId
 * @param {string} targetId - the target port identifier
 */
export const setLinkTarget = (linkId, targetId) => {
    return {
        type: FLOWDESIGNER_LINK_SET_TARGET,
        linkId,
        targetId,
    };
};

/**
 * Ask for change of link source
 * @param {string} linkId
 * @param {string} sourceId - the source port identifier
 */
export const setSourceTarget = (linkId, sourceId) => {
    return {
        type: FLOWDESIGNER_LINK_SET_SOURCE,
        sourceId,
    };
};

/**
 * Ask for link removal
 * @param {string} linkId
 * @return {Object}
 */
export const removeLink = (linkId) => {
    return {
        type: FLOWDESIGNER_LINK_REMOVE,
        linkId,
    };
};

/**
 * Ask to set attributes on link
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkAttr = (linkId, attr) => {
    return {
        type: FLOWDESIGNER_LINK_SET_ATTR,
        linkId,
        attr,
    };
};
