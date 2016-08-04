import invariant from 'invariant';

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
export const addLink = (linkId, sourceId, targetId, linkType, attr) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (state.flowDesigner.links[linkId]) {
            error = true;
            invariant(
                false,
                `can't set a target ${targetId} on non existing link with id ${linkId}`);
        }
        if (state.flowDesigner.ports[targetId]) {
            error = true;
            invariant(
                false,
                `can't set a non existing target with id ${targetId} on link ${linkId}`
            );
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_LINK_ADD,
                linkId,
                sourceId,
                targetId,
                linkType,
                attr,
            });
        }
    }


);

/**
 * Ask for change of link target
 * @param {string} linkId
 * @param {string} targetId - the target port identifier
 */
export const setLinkTarget = (linkId, targetId) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (state.flowDesigner.links[linkId]) {
            error = true;
            invariant(
                false,
                `can't set a target ${targetId} on non existing link with id ${linkId}`);
        }
        if (state.flowDesigner.ports[targetId]) {
            error = true;
            invariant(
                false,
                `can't set a non existing target with id ${targetId} on link ${linkId}`
            );
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_LINK_SET_TARGET,
                linkId,
                targetId,
            });
        }
    }
);

/**
 * Ask for change of link source
 * @param {string} linkId
 * @param {string} sourceId - the source port identifier
 */
export const setSourceTarget = (linkId, sourceId) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (state.flowDesigner.links[linkId]) {
            error = true;
            invariant(
                false,
                `can't set a source ${sourceId} on non existing link with id ${linkId}`
            );
        }
        if (state.flowDesigner.ports[sourceId]) {
            error = true;
            invariant(
                false,
                `can't set a non existing target with id ${sourceId} on link ${linkId}`
            );
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_LINK_SET_SOURCE,
                linkId,
                sourceId,
            });
        }
    }
);

/**
 * Ask for link removal
 * @param {string} linkId
 * @return {Object}
 */
export const removeLink = (linkId) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (state.flowDesigner.links[linkId]) {
            error = true;
            invariant(
                false,
                `can't remove non existing link ${linkId}`);
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_LINK_REMOVE,
                linkId,
            });
        }
    }
);

/**
 * Ask to set attributes on link
 * @param {string} linkId
 * @param {Object} attr
 */
export const setLinkAttr = (linkId, attr) => (
    (dispatch, getState) => {
        const state = getState();
        let error = false;
        if (state.flowDesigner.links[linkId]) {
            error = true;
            invariant(
                false,
                `can't set attribute on non existing link ${linkId}`);
        }
        if (!error) {
            dispatch({
                type: FLOWDESIGNER_LINK_SET_ATTR,
                linkId,
                attr,
            });
        }
    }
);
